const Miembro = require("../models/miembro");
const TipoMiembro = require("../models/tipoMiembro");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/.test(n);
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
  return res;
}

function validNumeroCamiseta(num) {
  return /^-?[0-9]+$/.test(num);
}

var fechaActual = new Date();
fechaActual.setFullYear(fechaActual.getFullYear() - 7);
fechaActual.setHours(0, 0, 0, 0);

var ancho = 0;
var alto = 0;


exports.createMiembro = catchAsyncErrors(async (req, res, next) => {
  const { posicion, tipo, nombre, cedula, numeroCamiseta, fechaNacimiento, foto } = req.body;


  if (!posicion) {
    return next(new ErrorHandler("La posición seleccionada no es válida", 400));
  }

  if (!tipo) {
    return next(
      new ErrorHandler("El tipo de miembro seleccionado no es válido", 400)
    );
  }

  const tipoM = await TipoMiembro.findById(tipo);

  if (tipoM.nombre === "jugador") {
    ancho = 200;
    alto = 400;
  } else {
    ancho = 255;
    alto = 255;
  }

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!cedula) {
    return next(new ErrorHandler("El número de cédula es obligatorio", 400));
  }

  if (fechaNacimiento === "") {
    return next(new ErrorHandler("La fecha de nacimiento es obligatoria", 400));
  }

  if (foto === "") {
    return next(new ErrorHandler("La foto es obligatoria", 400));
  }

  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras y espacios", 400)
    );
  }

  if (validCedula(cedula) === 0) {
    return next(new ErrorHandler("El número de cédula no es válido", 400));
  }

  if (numeroCamiseta != "") {
    if (!validNumeroCamiseta(numeroCamiseta) || numeroCamiseta < 0 || numeroCamiseta > 500) {
      return next(new ErrorHandler("El número de camiseta no es válido y debe estar entre 1 y 500", 400));
    }
  }

  var fechaN = new Date(fechaNacimiento);


  if (fechaN > fechaActual) {
    return next(new ErrorHandler("La fecha de nacimiento no es válida", 400));
  }

  let fotoLink = {};

  const result = await cloudinary.v2.uploader.upload(foto, {
    folder: "miembros",
    width: ancho,
    height: alto,
    crop: "scale",
  });

  fotoLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.foto = fotoLink;

  const miembro = await Miembro.create(req.body);

  res.status(201).json({
    success: true,
    miembro,
  });
});

exports.getJugadores = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find().populate(
    "tipo",
    "nombre"
  ).populate("posicion",
    "nombre");;
  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getCuerpoTecnico = catchAsyncErrors(async (req, res, next) => {


  const miembros = await Miembro.find().populate(
    "tipo",
    "nombre"
  ).populate("posicion",
    "nombre");;

  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getCuerpoMedico = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find({ tipo: "Cuerpo médico" });

  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getAdminMiembros = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find().populate(
    "tipo",
    "nombre"
  ).populate("posicion",
    "nombre");;


  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getSingleMiembro = catchAsyncErrors(async (req, res, next) => {
  const miembro = await Miembro.findById(req.params.id);

  if (!miembro) {
    return next(new ErrorHandler("Miembro no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    miembro,
  });
});

exports.updateMiembro = catchAsyncErrors(async (req, res, next) => {
  let miembro = await Miembro.findById(req.params.id);


  if (!miembro) {
    return next(new ErrorHandler("Miembro no encontrado", 404));
  }

  const { posicion, tipo, nombre, numeroCamiseta } = req.body;

  if (!posicion) {
    return next(new ErrorHandler("La posición seleccionada no es válida", 400));
  }

  if (!tipo) {
    return next(
      new ErrorHandler("El tipo de miembro seleccionado no es válido", 400)
    );
  }

  const tipoM = await TipoMiembro.findById(tipo);

  if (tipoM.nombre === "jugador") {
    ancho = 200;
    alto = 400;
  } else {
    ancho = 255;
    alto = 255;
  }

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras y espacios", 400)
    );
  }

  if (numeroCamiseta != "") {
    if (!validNumeroCamiseta(numeroCamiseta) || numeroCamiseta < 0 || numeroCamiseta > 500) {
      return next(new ErrorHandler("El número de camiseta no es válido y debe estar entre 1 y 500", 400));
    }
  }


  const newMiembroData = {
    posicion: posicion,
    tipo: tipo,
    nombre: nombre,
    numeroCamiseta: req.body.numeroCamiseta,
    fechaNacimiento: req.body.fechaNacimiento,
    nacionalidad: req.body.nacionalidad,
  };

  if (req.body.foto !== "") {
    const foto_id = miembro.foto.public_id;
    const res = await cloudinary.v2.uploader.destroy(foto_id);

    const result = await cloudinary.v2.uploader.upload(req.body.foto, {
      folder: "miembros",
      width: ancho,
      height: alto,
      crop: "scale",
    });

    newMiembroData.foto = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  miembro = await Miembro.findByIdAndUpdate(req.params.id, newMiembroData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteMiembro = catchAsyncErrors(async (req, res, next) => {
  const newMiembroData = {
    estado: "inactivo",
  };

  const miembro = await Miembro.findByIdAndUpdate(
    req.params.id,
    newMiembroData,
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
