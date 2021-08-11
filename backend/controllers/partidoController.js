const Partido = require("../models/partido");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(n);
}

var fechaActual = new Date();
fechaActual.setDate(fechaActual.getDate()-1);
fechaActual.setHours(0,0,0,0);

exports.createPartido = catchAsyncErrors(async (req, res, next) => {
  const {
    logoLocal,
    nombreLocal,
    golesLocal,
    logoVisitante,
    nombreVisitante,
    golesVisitante,
    fecha,
    hora,
    estadio,
  } = req.body;

  var fechaPartido = new Date(fecha);

  if (!nombreLocal) {
    return next(
      new ErrorHandler("El nombre del equipo local es obligatorio", 400)
    );
  }

  if (logoLocal === "") {
    return next(
      new ErrorHandler("El logo del equipo local es obligatorio", 400)
    );
  }

  if (golesLocal < 0) {
    return next(
      new ErrorHandler(
        "Los goles del equipo local no admiten valores menores a 0 ",
        400
      )
    );
  }

  if (!nombreVisitante) {
    return next(
      new ErrorHandler("El nombre del equipo visitante es obligatorio", 400)
    );
  }

  if (logoVisitante === "") {
    return next(
      new ErrorHandler("El logo del equipo visitante es obligatorio", 400)
    );
  }

  if (golesVisitante < 0) {
    return next(
      new ErrorHandler(
        "Los goles del equipo visitante no admiten valores menores a 0 ",
        400
      )
    );
  }


  if (fechaPartido < fechaActual) {
  
    return next(new ErrorHandler("La fecha del partido no puede ser menor a la fecha actual", 400));
  }

  if (fecha === "") {
    return next(new ErrorHandler("La fecha seleccionada no es válida", 400));
  }

  if (hora === "") {
    return next(new ErrorHandler("La hora seleccionada no es válida", 400));
  }

  if (hora < "09:00" || hora > "19:00") {
    return next(new ErrorHandler("La hora debe estar entre las 09:00 y 19:00", 400));
  }

  if(estadio !== ""){
  if (!validNombre(estadio)) {
    return next(
      new ErrorHandler(
        "El nombre del estadio solo admite letras, números y espacios",
        400
      )
    );
  }
  }

  let logoLocalLink = {};
  let logoVisitanteLink = {};

  const result = await cloudinary.v2.uploader.upload(logoLocal, {
    folder: "partidos",
    width: 114,
    height: 108,
    crop: "scale",
  });

  const result1 = await cloudinary.v2.uploader.upload(logoVisitante, {
    folder: "partidos",
    width: 114,
    height: 108,
    crop: "scale",
  });

  logoLocalLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  logoVisitanteLink = {
    public_id: result1.public_id,
    url: result1.secure_url,
  };

  req.body.logoLocal = logoLocalLink;
  req.body.logoVisitante = logoVisitanteLink;

  const partido = await Partido.create(req.body);

  res.status(201).json({
    success: true,
    partido,
  });
});

exports.getAdminPartidos = catchAsyncErrors(async (req, res, next) => {
  const partidos = await Partido.find();

  res.status(200).json({
    success: true,
    partidos,
  });
});

exports.getPartidoTop = catchAsyncErrors(async (req, res, next) => {
  const partidos = await Partido.find().sort({ _id: -1 }).limit(1);

  res.status(200).json({
    success: true,
    partidos,
  });
});

exports.getPartidosLast = catchAsyncErrors(async (req, res, next) => {
  const partidos = await Partido.find({ golesLocal: { $ne: null } })
    .sort({ _id: -1 })
    .limit(5);

  res.status(200).json({
    success: true,
    partidos,
  });
});

exports.getPartidosNext = catchAsyncErrors(async (req, res, next) => {
  const partidos = await Partido.find({ golesLocal: null }).sort({ _id: 1 });

  res.status(200).json({
    success: true,
    partidos,
  });
});

exports.getSinglePartido = catchAsyncErrors(async (req, res, next) => {
  const partido = await Partido.findById(req.params.id);

  if (!partido) {
    return next(new ErrorHandler("Partido no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    partido,
  });
});

exports.updatePartido = catchAsyncErrors(async (req, res, next) => {
  let partido = await Partido.findById(req.params.id);

  if (!partido) {
    return next(new ErrorHandler("Partido no encontrado", 404));
  }

  const {
    nombreLocal,
    golesLocal,
    nombreVisitante,
    golesVisitante,
    fecha,
    hora,
    estadio,
  } = req.body;

  if (!nombreLocal) {
    return next(
      new ErrorHandler("El nombre del equipo local es obligatorio", 400)
    );
  }

  if (golesLocal < 0) {
    return next(
      new ErrorHandler(
        "Los goles del equipo local no admiten valores menores a 0 ",
        400
      )
    );
  }

  if (!nombreVisitante) {
    return next(
      new ErrorHandler("El nombre del equipo visitante es obligatorio", 400)
    );
  }

  if (golesVisitante < 0) {
    return next(
      new ErrorHandler(
        "Los goles del equipo visitante no admiten valores menores a 0 ",
        400
      )
    );
  }

  if (fechaPartido < fechaActual) {
  
    return next(new ErrorHandler("La fecha del partido no puede ser menor a la fecha actual", 400));
  }

  if (fecha === "") {
    return next(new ErrorHandler("La fecha seleccionada no es válida", 400));
  }

  if (hora === "") {
    return next(new ErrorHandler("La hora seleccionada no es válida", 400));
  }

  if (hora < "09:00" || hora > "19:00") {
    return next(new ErrorHandler("La hora debe estar entre las 09:00 y 19:00", 400));
  }
  
  if(estadio !== ""){
    if (!validNombre(estadio)) {
      return next(
        new ErrorHandler(
          "El nombre del estadio solo admite letras, números y espacios",
          400
        )
      );
    }
  }
  
  const newPartidoData = {
    nombreLocal: nombreLocal,
    golesLocal: golesLocal,
    nombreVisitante: nombreVisitante,
    golesVisitante: golesVisitante,
    fecha: fecha,
    hora: hora,
    estadio: estadio,
  };

  if (req.body.logoLocal !== "") {
    const imagen_id = partido.logoLocal.public_id;
    const res = await cloudinary.v2.uploader.destroy(imagen_id);

    const result = await cloudinary.v2.uploader.upload(req.body.logoLocal, {
      folder: "partidos",
      width: 114,
      height: 108,
      crop: "scale",
    });

    newPartidoData.logoLocal = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  if (req.body.logoVisitante !== "") {
    const imagen_id = partido.logoVisitante.public_id;
    const res = await cloudinary.v2.uploader.destroy(imagen_id);

    const result = await cloudinary.v2.uploader.upload(req.body.logoVisitante, {
      folder: "partidos",
      width: 114,
      height: 108,
      crop: "scale",
    });

    newPartidoData.logoVisitante = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  partido = await Partido.findByIdAndUpdate(req.params.id, newPartidoData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deletePartido = catchAsyncErrors(async (req, res, next) => {
  const partido = await Partido.findById(req.params.id);

  if (!partido) {
    return next(new ErrorHandler("Partido no encontrado", 404));
  }
  const imagen_id = partido.logoLocal.public_id;
  await cloudinary.v2.uploader.destroy(imagen_id);

  const imagen1_id = partido.logoVisitante.public_id;
  await cloudinary.v2.uploader.destroy(imagen1_id);

  await partido.remove();

  res.status(200).json({
    success: true,
  });
});
