const Informacion = require("../models/informacion");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.createInformacion = catchAsyncErrors(async (req, res, next) => {
  let imagenPrincipalLink = {};
  let imagenAcercaLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.imagenPrincipal, {
    folder: "informacion",
    width: 1920,
    height: 1336,
    crop: "scale",
  });

  const result1 = await cloudinary.v2.uploader.upload(req.body.imagenAcerca, {
    folder: "informacion",
    width: 444,
    height: 339,
    crop: "scale",
  });

  imagenPrincipalLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  imagenAcercaLink = {
    public_id: result1.public_id,
    url: result1.secure_url,
  };

  req.body.imagenPrincipal = imagenPrincipalLink;
  req.body.imagenAcerca = imagenAcercaLink;

  const informacion = await Informacion.create(req.body);

  res.status(201).json({
    success: true,
    informacion,
  });
});

exports.getAdminInformacion = catchAsyncErrors(async (req, res, next) => {
  const informacion = await Informacion.find({}).sort({ _id: -1 }).limit(1);

  res.status(200).json({
    success: true,
    informacion,
  });
});

exports.getSingleInformacion = catchAsyncErrors(async (req, res, next) => {
  const informacion = await Informacion.findById(req.params.id);

  if (!informacion) {
    return next(new ErrorHandler("Información no encontrada", 404));
  }

  res.status(200).json({
    success: true,
    informacion,
  });
});

exports.updateInformacion = catchAsyncErrors(async (req, res, next) => {
  let informacion = await Informacion.findById(req.params.id);

  if (!informacion) {
    return next(new ErrorHandler("Información no encontrada", 404));
  }

  const newInformacionData = {
    lemaPrincipal: req.body.lemaPrincipal,
    lemaSecundario: req.body.lemaSecundario,
    videoPrincipal: req.body.videoPrincipal,
    bannerVideo: req.body.bannerVideo,
    emblemaAcerca: req.body.emblemaAcerca,
    mision: req.body.mision,
    vision: req.body.vision,
  };

  if (req.body.imagenPrincipal !== "") {
    const imagen_id = informacion.imagenPrincipal.public_id;
    const res = await cloudinary.v2.uploader.destroy(imagen_id);

    const result = await cloudinary.v2.uploader.upload(
      req.body.imagenPrincipal,
      {
        folder: "informacion",
        width: 1920,
        height: 1336,
        crop: "scale",
      }
    );

    newInformacionData.imagenPrincipal = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  if (req.body.imagenAcerca !== "") {
    const imagen_id = informacion.imagenAcerca.public_id;
    const res = await cloudinary.v2.uploader.destroy(imagen_id);

    const result = await cloudinary.v2.uploader.upload(req.body.imagenAcerca, {
      folder: "informacion",
      width: 444,
      height: 339,
      crop: "scale",
    });

    newInformacionData.imagenAcerca = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  informacion = await Informacion.findByIdAndUpdate(
    req.params.id,
    newInformacionData,
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
