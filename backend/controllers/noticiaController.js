const Noticia = require("../models/noticia");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.createNoticia = catchAsyncErrors(async (req, res, next) => {
  let imagen = [];
  if (typeof req.body.imagen === "string") {
    imagen.push(req.body.imagen);
  } else {
    imagen = req.body.imagen;
  }

  let imagenLink = [];

  for (let i = 0; i < imagen.length; i++) {
    const result = await cloudinary.v2.uploader.upload(imagen[i], {
      folder: "noticias",
    });

    imagenLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

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

  let imagen = [];
  if (typeof req.body.imagen === "string") {
    imagen.push(req.body.imagen);
  } else {
    imagen = req.body.imagen;
  }

  if (imagen !== undefined) {
    for (let i = 0; i < noticia.imagen.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        noticia.imagen[i].public_id
      );
    }

    let imagenLink = [];

    for (let i = 0; i < imagen.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagen[i], {
        folder: "noticias",
      });

      imagenLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.imagen = imagenLink;
  }

  noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    noticia,
  });
});

exports.deleteNoticia = catchAsyncErrors(async (req, res, next) => {
  const noticia = await Noticia.findById(req.params.id);

  if (!noticia) {
    return next(new ErrorHandler("Noticia no encontrada", 404));
  }

  for (let i = 0; i < noticia.imagen.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      noticia.imagen[i].public_id
    );
  }

  await noticia.remove();

  res.status(200).json({
    success: true,
    message: "Noticia eliminada.",
  });
});
