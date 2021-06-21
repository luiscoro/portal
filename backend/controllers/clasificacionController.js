const Clasificacion = require("../models/clasificacion");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createClasificacion = catchAsyncErrors(async (req, res, next) => {
  const { equipo, puntos, golDiferencia } = req.body;

  if (!equipo) {
    return next(new ErrorHandler("Ingresa el nombre del equipo", 401));
  }
  if (!puntos) {
    return next(new ErrorHandler("Ingresa los puntos del equipo", 401));
  }
  if (!golDiferencia) {
    return next(
      new ErrorHandler("Ingresa el gol de diferencia del equipo", 401)
    );
  }

  const clasificacion = await Clasificacion.create(req.body);

  res.status(201).json({
    success: true,
    clasificacion,
  });
});

exports.getAdminClasificaciones = catchAsyncErrors(async (req, res, next) => {
  const clasificaciones = await Clasificacion.find({}).sort({
    puntos: -1,
    golDiferencia: -1,
  });

  res.status(200).json({
    success: true,
    clasificaciones,
  });
});

exports.getSingleClasificacion = catchAsyncErrors(async (req, res, next) => {
  const clasificacion = await Clasificacion.findById(req.params.id);

  if (!clasificacion) {
    return next(new ErrorHandler("Clasificación no encontrada", 404));
  }

  res.status(200).json({
    success: true,
    clasificacion,
  });
});

exports.updateClasificacion = catchAsyncErrors(async (req, res, next) => {
  const { equipo, puntos, golDiferencia } = req.body;

  const newClasificacionData = {
    equipo: equipo,
    puntos: puntos,
    golDiferencia: golDiferencia,
  };

  const clasificacion = await Clasificacion.findByIdAndUpdate(
    req.params.id,
    newClasificacionData,
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

exports.deleteClasificacion = catchAsyncErrors(async (req, res, next) => {
  const clasificacion = await Clasificacion.findById(req.params.id);

  if (!clasificacion) {
    return next(new ErrorHandler("Clasificación no encontrada", 404));
  }

  await clasificacion.remove();

  res.status(200).json({
    success: true,
  });
});
