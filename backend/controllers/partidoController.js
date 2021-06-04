const Partido = require("../models/partido");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.createPartido = catchAsyncErrors(async (req, res, next) => {
  let logoLocalLink = {};
  let logoVisitanteLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.logoLocal, {
    folder: "partidos",
    width: 114,
    height: 108,
    crop: "scale",
  });

  const result1 = await cloudinary.v2.uploader.upload(req.body.logoVisitante, {
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
  req.body.usuario = req.usuario.id;

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
  const partidos = await Partido.find({ golesLocal: { $ne: null } })
    .sort({ _id: -1 })
    .limit(1);

  res.status(200).json({
    success: true,
    partidos,
  });
});

exports.getPartidosLast = catchAsyncErrors(async (req, res, next) => {
  const partidos = await Partido.find({ golesLocal: null })
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

  const newPartidoData = {
    nombreLocal: req.body.nombreLocal,
    golesLocal: req.body.golesLocal,
    nombreVisitante: req.body.nombreVisitante,
    golesVisitante: req.body.golesVisitante,
    fecha: req.body.fecha,
    hora: req.body.hora,
    estadio: req.body.estadio,
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
