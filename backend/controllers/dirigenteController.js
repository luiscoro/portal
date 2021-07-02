const Dirigente = require("../models/dirigente");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.createDirigente = catchAsyncErrors(async (req, res, next) => {
  const { nombre, cargo } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 401));
  }

  if (!cargo) {
    return next(new ErrorHandler("El cargo es obligatorio", 401));
  }

  let fotoLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.foto, {
    folder: "dirigentes",
    width: 255,
    height: 255,
    crop: "scale",
  });

  fotoLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.foto = fotoLink;

  const dirigente = await Dirigente.create(req.body);

  res.status(201).json({
    success: true,
    dirigente,
  });
});

exports.getAdminDirigentes = catchAsyncErrors(async (req, res, next) => {
  const dirigentes = await Dirigente.find();

  res.status(200).json({
    success: true,
    dirigentes,
  });
});

exports.getSingleDirigente = catchAsyncErrors(async (req, res, next) => {
  const dirigente = await Dirigente.findById(req.params.id);

  if (!dirigente) {
    return next(new ErrorHandler("Dirigente no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    dirigente,
  });
});

exports.updateDirigente = catchAsyncErrors(async (req, res, next) => {
  let dirigente = await Dirigente.findById(req.params.id);

  if (!dirigente) {
    return next(new ErrorHandler("Dirigente no encontrado", 404));
  }

  const { nombre, cargo } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 401));
  }

  if (!cargo) {
    return next(new ErrorHandler("El cargo es obligatorio", 401));
  }

  const newDirigenteData = {
    nombre: nombre,
    cargo: cargo,
  };

  if (req.body.foto !== "") {
    const foto_id = dirigente.foto.public_id;
    const res = await cloudinary.v2.uploader.destroy(foto_id);

    const result = await cloudinary.v2.uploader.upload(req.body.foto, {
      folder: "dirigentes",
      width: 255,
      height: 255,
      crop: "scale",
    });

    newDirigenteData.foto = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  dirigente = await Dirigente.findByIdAndUpdate(
    req.params.id,
    newDirigenteData,
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

exports.deleteDirigente = catchAsyncErrors(async (req, res, next) => {
  const dirigente = await Dirigente.findById(req.params.id);

  if (!dirigente) {
    return next(new ErrorHandler("Dirigente no encontrado", 404));
  }
  const foto_id = dirigente.foto.public_id;
  await cloudinary.v2.uploader.destroy(foto_id);

  await dirigente.remove();

  res.status(200).json({
    success: true,
  });
});
