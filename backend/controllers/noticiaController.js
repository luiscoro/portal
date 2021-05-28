const Noticia = require("../models/noticia");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.createNoticia = catchAsyncErrors(async (req, res, next) => {
  //const { titulo, descripcion } = req.body;

  let imagenLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.imagen, {
    folder: "noticias",
  });

  imagenLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.imagen = imagenLink;
  req.body.usuario = req.usuario.id;

  const noticia = await Noticia.create(req.body);

  res.status(201).json({
    success: true,
    noticia,
  });
});

exports.getNoticias = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const noticiasCount = await Noitcia.countDocuments();

  const apiFeatures = new APIFeatures(Noticia.find(), req.query)
    .search()
    .filter();

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

  const newNoticiaData = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
  };

  if (req.body.imagen !== "") {
    const imagen_id = noticia.imagen.public_id;
    const res = await cloudinary.v2.uploader.destroy(imagen_id);

    const result = await cloudinary.v2.uploader.upload(req.body.imagen, {
      folder: "noticias",
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
