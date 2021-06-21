const Auspiciante = require("../models/auspiciante");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.createAuspiciante = catchAsyncErrors(async (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("Ingresa el nombre del auspiciante", 401));
  }

  let logoLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.logo, {
    folder: "auspiciantes",
    width: 157,
    height: 164,
    crop: "scale",
  });

  logoLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.logo = logoLink;

  const auspiciante = await Auspiciante.create(req.body);

  res.status(201).json({
    success: true,
    auspiciante,
  });
});

exports.getAdminAuspiciantes = catchAsyncErrors(async (req, res, next) => {
  const auspiciantes = await Auspiciante.find();

  res.status(200).json({
    success: true,
    auspiciantes,
  });
});

exports.getSingleAuspiciante = catchAsyncErrors(async (req, res, next) => {
  const auspiciante = await Auspiciante.findById(req.params.id);

  if (!auspiciante) {
    return next(new ErrorHandler("Auspiciante no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    auspiciante,
  });
});

exports.updateAuspiciante = catchAsyncErrors(async (req, res, next) => {
  let auspiciante = await Auspiciante.findById(req.params.id);

  if (!auspiciante) {
    return next(new ErrorHandler("Auspiciante no encontrado", 404));
  }

  const { nombre } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("Ingresa el nombre del auspiciante", 401));
  }

  const newAuspicianteData = {
    nombre: nombre,
  };

  if (req.body.logo !== "") {
    const logo_id = auspiciante.logo.public_id;
    const res = await cloudinary.v2.uploader.destroy(logo_id);

    const result = await cloudinary.v2.uploader.upload(req.body.logo, {
      folder: "auspiciantes",
      width: 157,
      height: 164,
      crop: "scale",
    });

    newAuspicianteData.logo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  auspiciante = await Auspiciante.findByIdAndUpdate(
    req.params.id,
    newAuspicianteData,
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

exports.deleteAuspiciante = catchAsyncErrors(async (req, res, next) => {
  const auspiciante = await Auspiciante.findById(req.params.id);

  if (!auspiciante) {
    return next(new ErrorHandler("Auspiciante no encontrada", 404));
  }
  const auspiciante_id = auspiciante.logo.public_id;
  await cloudinary.v2.uploader.destroy(auspiciante_id);

  await auspiciante.remove();

  res.status(200).json({
    success: true,
  });
});
