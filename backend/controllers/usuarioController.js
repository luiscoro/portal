const Usuario = require("../models/usuario");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

var d = new Date();
d.setHours(d.getHours() - 5);

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/.test(n);
}

function validEmail(m) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(m);
}

function validPassword(p) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(p);
}

function validCedula(c) {
  var res = 0;
  var cad = c;
  var total = 0;
  var longitud = cad.length;
  var longcheck = longitud - 1;

  if (cad !== "" && longitud === 10) {
    for (i = 0; i < longcheck; i++) {
      if (i % 2 === 0) {
        var aux = cad.charAt(i) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } else {
        total += parseInt(cad.charAt(i));
      }
    }

    total = total % 10 ? 10 - (total % 10) : 0;

    if (cad.charAt(longitud - 1) == total) {
      res = 1;
    }

    return res;
  }
}

function validTelefono(t) {
  return /^([0-9]){9,10}$/.test(t);
}

function validDireccion(d) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(d);
}

function validCodigoPostal(c) {
  return /^([0-9]){6,6}$/.test(c);
}

exports.createUsuario = catchAsyncErrors(async (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!email) {
    return next(new ErrorHandler("El correo electrónico es obligatorio", 400));
  }

  if (!password) {
    return next(new ErrorHandler("La contraseña es obligatoria", 400));
  }

  if (!validNombre(nombre)) {
    return next(new ErrorHandler("El nombre solo admite letras y espacios", 400));
  }

  if (!validEmail(email)) {
    return next(new ErrorHandler("El correo electrónico no es válido", 400));
  }

  if (!validPassword(password)) {
    return next(
      new ErrorHandler(
        "La contraseña debe tener al menos 8 caracteres, una letra y un número",
        400
      )
    );
  }

  const usuario = await Usuario.create({
    nombre,
    email,
    password,
  });

  sendToken(usuario, 200, res);
});

exports.loginUsuario = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email, estado: "activo" }).select(
    "+password"
  );

  if (!usuario) {
    return next(
      new ErrorHandler("Las credenciales ingresadas son incorrectas", 401)
    );
  }

  const esPassword = await usuario.comparePassword(password);

  if (!esPassword) {
    return next(new ErrorHandler("La contraseña ingresada es incorrecta", 401));
  }

  sendToken(usuario, 200, res);
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findOne({ email: req.body.email });

  if (!usuario) {
    return next(
      new ErrorHandler(
        "El correo electrónico ingresado no pertenece a ninguna cuenta registrada",
        404
      )
    );
  }

  const resetToken = usuario.getResetPasswordToken();

  await usuario.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `La dirección para restablecer la contraseña es la siguiente:\n\n${resetUrl}\n\nEn caso de no haber solicitado esto, ignora este correo.`;

  try {
    await sendEmail({
      email: usuario.email,
      subject: "Restablecimiento de contraseña",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Correo enviado a: ${usuario.email}`,
    });
  } catch (error) {
    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpire = undefined;

    await usuario.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const usuario = await Usuario.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!usuario) {
    return next(
      new ErrorHandler(
        "El token para restablecer la contraseña es inválido o ha expirado",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Las contraseñas no coinciden", 400));
  }

  usuario.password = req.body.password;

  usuario.resetPasswordToken = undefined;
  usuario.resetPasswordExpire = undefined;

  await usuario.save();

  sendToken(usuario, 200, res);
});

exports.getUsuarioProfile = catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id);

  res.status(200).json({
    success: true,
    usuario,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id).select("+password");

  const esIgual = await usuario.comparePassword(req.body.oldPassword);
  if (!esIgual) {
    return next(new ErrorHandler("La contraseña actual es incorrecta"));
  }

  const { password } = req.body;

  if (!password) {
    return next(new ErrorHandler("La contraseña es obligatoria", 400));
  }

  if (!validPassword(password)) {
    return next(
      new ErrorHandler(
        "La contraseña debe tener al menos 8 caracteres, una letra y un número",
        400
      )
    );
  }

  usuario.password = password;
  await usuario.save();

  sendToken(usuario, 200, res);
});

exports.updateInfoEnvio = catchAsyncErrors(async (req, res, next) => {
  const { cedula, direccion, telefono, ciudad, codigoPostal } = req.body;

  if (!cedula) {
    return next(new ErrorHandler("El número de cédula es obligatorio", 400));
  }

  if (!ciudad) {
    return next(new ErrorHandler("La ciudad seleccionada no es válida", 400));
  }

  if (!telefono) {
    return next(new ErrorHandler("El teléfono es obligatorio", 400));
  }

  if (!codigoPostal) {
    return next(new ErrorHandler("El código postal es obligatorio", 400));
  }

  if (validCedula(cedula) == 0) {
    return next(new ErrorHandler("El número de cédula no es válido", 400));
  }

  if (!validTelefono(telefono)) {
    return next(
      new ErrorHandler(
        "El número de teléfono o celular solo puede tener 9 o 10 dígitos",
        400
      )
    );
  }

  if (!validDireccion(direccion)) {
    return next(
      new ErrorHandler(
        "La dirección solo admite letras, números y espacios",
        400
      )
    );
  }

  if (!validCodigoPostal(codigoPostal)) {
    return next(
      new ErrorHandler("El código postal solo puede tener 6 dígitos", 400)
    );
  }

  const newUsuarioData = {
    cedula: cedula,
    direccion: direccion,
    telefono: telefono,
    ciudad: ciudad,
    codigoPostal: codigoPostal,
  };

  const usuario = await Usuario.findByIdAndUpdate(
    req.usuario.id,
    newUsuarioData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.updatePerfil = catchAsyncErrors(async (req, res, next) => {
  const { nombre, email } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!email) {
    return next(new ErrorHandler("El correo electrónico es obligatorio", 400));
  }

  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras y espacios", 400)
    );
  }

  if (!validEmail(email)) {
    return next(new ErrorHandler("El correo electrónico no es válido", 400));
  }

  const newUsuarioData = {
    nombre: nombre,
    email: email,
  };

  const usuario = await Usuario.findByIdAndUpdate(
    req.usuario.id,
    newUsuarioData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(d),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "La sesión ha sido cerrada",
  });
});

exports.deleteUsuario = catchAsyncErrors(async (req, res, next) => {
  const newUsuarioData = {
    estado: req.body.estado,
  };

  const usuario = await Usuario.findByIdAndUpdate(
    req.usuario.id,
    newUsuarioData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// ADMINISTRADOR

exports.getUsuarios = catchAsyncErrors(async (req, res, next) => {
  const usuarios = await Usuario.find();

  res.status(200).json({
    success: true,
    usuarios,
  });
});

exports.getUsuarioDetails = catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findById(req.params.id);

  if (!usuario) {
    return next(
      new ErrorHandler(`Usuario no encontrado con id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    usuario,
  });
});

exports.updateUsuario = catchAsyncErrors(async (req, res, next) => {
  const newUsuarioData = {
    nombre: req.body.nombre,
    email: req.body.email,
    rol: req.body.rol,
    estado: req.body.estado,
  };

  const usuario = await Usuario.findByIdAndUpdate(
    req.params.id,
    newUsuarioData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
