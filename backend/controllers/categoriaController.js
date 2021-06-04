const Categoria = require("../models/categoria");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createCategoria = catchAsyncErrors(async (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("Ingresa el nombre de la categoría", 401));
  }

  req.body.usuario = req.usuario.id;

  const categoria = await Categoria.create(req.body);

  res.status(201).json({
    success: true,
    categoria,
  });
});

exports.getAdminCategorias = catchAsyncErrors(async (req, res, next) => {
  const categorias = await Categoria.find();

  res.status(200).json({
    success: true,
    categorias,
  });
});

exports.getSingleCategoria = catchAsyncErrors(async (req, res, next) => {
  const categoria = await Categoria.findById(req.params.id);

  if (!categoria) {
    return next(new ErrorHandler("Categoría no encontrada", 404));
  }

  res.status(200).json({
    success: true,
    categoria,
  });
});

exports.updateCategoria = catchAsyncErrors(async (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("Ingresa el nombre de la categoría", 401));
  }

  const newCategoriaData = {
    nombre: nombre,
  };

  const categoria = await Categoria.findByIdAndUpdate(
    req.params.id,
    newCategoriaData,
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

exports.deleteCategoria = catchAsyncErrors(async (req, res, next) => {
  const categoria = await Categoria.findById(req.params.id);

  if (!categoria) {
    return next(new ErrorHandler("Categoría no encontrada", 404));
  }

  await categoria.remove();

  res.status(200).json({
    success: true,
  });
});
