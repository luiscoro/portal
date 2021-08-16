const Noticia = require("../models/noticia");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/featuresNoticia");
const cloudinary = require("cloudinary");

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ 0-9 ,.]+$/.test(n);
}

exports.createNoticia = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.titulo) {
    return next(new ErrorHandler("El título es obligatorio", 400));
  }

  if (!req.body.descripcion) {
    return next(new ErrorHandler("La descripción es obligatoria", 400));
  }

  if (req.body.imagen === "") {
    return next(new ErrorHandler("La imagen es obligatoria", 400));
  }

  if (!validNombre(req.body.titulo)) {
    return next(
      new ErrorHandler("El título solo admite letras, números y espacios", 400)
    );
  }

  if (!validNombre(req.body.descripcion)) {
    return next(
      new ErrorHandler(
        "La descripción solo admite letras, números y espacios",
        400
      )
    );
  }

  let imagenLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.imagen, {
    folder: "noticias",
    width: 539,
    height: 340,
    crop: "scale",
  });

  imagenLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.imagen = imagenLink;

  const noticia = await Noticia.create(req.body);

  res.status(201).json({
    success: true,
    noticia,
  });
});

exports.getNoticiasTop = catchAsyncErrors(async (req, res, next) => {
  const noticias = await Noticia.find({}).sort({ fecha: -1 }).limit(2);

  res.status(200).json({
    success: true,
    noticias,
  });
});

exports.getNoticias = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 2;
  const noticiasCount = await Noticia.countDocuments();

  const apiFeatures = new APIFeatures(
    Noticia.find().sort({ fecha: -1 }),
    req.query
  ).search();

  let noticias = await apiFeatures.query;
  let filteredNoticiasCount = noticias.length;

  apiFeatures.pagination(resPerPage);
  noticias = await apiFeatures.query;

  res.status(200).json({
    success: true,
    noticiasCount,
    resPerPage,
    filteredNoticiasCount,
    noticias,
  });
});

//ADMINISTRADOR

exports.getAdminNoticias = catchAsyncErrors(async (req, res, next) => {
  const noticias = await Noticia.find();

  res.status(200).json({
    success: true,
    noticias,
  });
});

exports.getSingleNoticia = catchAsyncErrors(async (req, res, next) => {
  const noticia = await Noticia.findById(req.params.id);

  if (!noticia) {
    return next(new ErrorHandler("Noticia no encontrada", 404));
  }

  res.status(200).json({
    success: true,
    noticia,
  });
});

exports.updateNoticia = catchAsyncErrors(async (req, res, next) => {
  let noticia = await Noticia.findById(req.params.id);

  if (!noticia) {
    return next(new ErrorHandler("Noticia no encontrada", 404));
  }

  const { titulo, descripcion } = req.body;

  if (!titulo) {
    return next(new ErrorHandler("El título es obligatorio", 400));
  }

  if (!descripcion) {
    return next(new ErrorHandler("La descripción es obligatoria", 400));
  }

  if (!validNombre(titulo)) {
    return next(
      new ErrorHandler("El título solo admite letras, números y espacios", 400)
    );
  }

  if (!validNombre(descripcion)) {
    return next(
      new ErrorHandler(
        "La descripción solo admite letras, números y espacios",
        400
      )
    );
  }
  const newNoticiaData = {
    titulo: titulo,
    descripcion: descripcion,
  };

  if (req.body.imagen !== "") {
    const imagen_id = noticia.imagen.public_id;
    const res = await cloudinary.v2.uploader.destroy(imagen_id);

    const result = await cloudinary.v2.uploader.upload(req.body.imagen, {
      folder: "noticias",
      width: 539,
      height: 340,
      crop: "scale",
    });

    newNoticiaData.imagen = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  noticia = await Noticia.findByIdAndUpdate(req.params.id, newNoticiaData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteNoticia = catchAsyncErrors(async (req, res, next) => {
  const noticia = await Noticia.findById(req.params.id);

  if (!noticia) {
    return next(new ErrorHandler("Noticia no encontrada", 404));
  }
  const imagen_id = noticia.imagen.public_id;
  await cloudinary.v2.uploader.destroy(imagen_id);

  await noticia.remove();

  res.status(200).json({
    success: true,
  });
});
