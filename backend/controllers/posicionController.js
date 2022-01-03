const Posicion = require("../models/posicion");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/.test(n);
}

exports.createPosicion = catchAsyncErrors(async (req, res, next) => {
  const { tipo, nombre } = req.body;

  if (!tipo) {
    return next(new ErrorHandler("El tipo seleccionado al cuál pertenece la posición no es válido", 400));
  }

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras y espacios", 400)
    );
  }

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
  const { estado } = req.body;

  const newPosicionData = {
    estado: estado,
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
  const newPosicionData = {
    estado: "inactiva",
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
