const Posicion = require("../models/posicion");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createPosicion = catchAsyncErrors(async (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("Ingresa el nombre de la posición", 401));
  }

  req.body.usuario = req.usuario.id;

  const posicion = await Posicion.create(req.body);

  res.status(201).json({
    success: true,
    posicion,
  });
});

exports.getAdminPosiciones = catchAsyncErrors(async (req, res, next) => {
  const posiciones = await Posicion.find();

  res.status(200).json({
    success: true,
    posiciones,
  });
});

exports.getSinglePosicion = catchAsyncErrors(async (req, res, next) => {
  const posicion = await Posicion.findById(req.params.id);

  if (!posicion) {
    return next(new ErrorHandler("Posición no encontrada", 404));
  }

  res.status(200).json({
    success: true,
    posicion,
  });
});

exports.updatePosicion = catchAsyncErrors(async (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("Ingresa el nombre de la posición", 401));
  }

  const newPosicionData = {
    nombre: nombre,
  };

  const posicion = await Posicion.findByIdAndUpdate(
    req.params.id,
    newPosicionData,
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

exports.deletePosicion = catchAsyncErrors(async (req, res, next) => {
  const posicion = await Posicion.findById(req.params.id);

  if (!posicion) {
    return next(new ErrorHandler("Posición no encontrada", 404));
  }

  await posicion.remove();

  res.status(200).json({
    success: true,
  });
});
