const Usuario = require("../models/usuario");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

var d = new Date();
d.setHours(d.getHours() - 5);

exports.createUsuario = catchAsyncErrors(async (req, res, next) => {
  const { nombre, email, password } = req.body;

  const usuario = await Usuario.create({
    nombre,
    email,
    password,
  });

  sendToken(usuario, 200, res);
});

exports.loginUsuario = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Ingrese correo y contraseña", 400));
  }

  const usuario = await Usuario.findOne({ email }).select("+password");

  if (!usuario) {
    return next(
      new ErrorHandler("Las credenciales ingresadas son incorrectas", 401)
    );
  }

  const isPasswordMatched = await usuario.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Las credenciales ingresadas son incorrectas", 401)
    );
  }

  sendToken(usuario, 200, res);
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findOne({ email: req.body.email });

  if (!usuario) {
    return next(
      new ErrorHandler(
        "El correo que se ha ingresado no pertenece a ninguna cuenta",
        404
      )
    );
  }

  const resetToken = usuario.getResetPasswordToken();

  await usuario.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `El token para restablecer la contraseña es el siguiente:\n\n${resetUrl}\n\nEn caso de no haber solicitado esto, ignora el correo enviado.`;

  try {
    await sendEmail({
      email: usuario.email,
      subject: "Restablecimiento de contraseña",
      message,
    });

    res.status(200).json({
      success: true,
      message: `El correo fue enviado a: ${usuario.email}`,
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
    resetPasswordExpire: { $gt: d },
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

  const isMatched = await usuario.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("La contraseña anterior es incorrecta"));
  }

  usuario.password = req.body.password;
  await usuario.save();

  sendToken(usuario, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUsuarioData = {
    nombre: req.body.nombre,
    email: req.body.email,
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

exports.deleteUsuario = catchAsyncErrors(async (req, res, next) => {
  const usuario = await Usuario.findById(req.params.id);

  if (!usuario) {
    return next(
      new ErrorHandler(`Usuario no encontrado con id: ${req.params.id}`)
    );
  }

  await usuario.remove();

  res.status(200).json({
    success: true,
  });
});
