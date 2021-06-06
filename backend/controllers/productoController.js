const Producto = require("../models/producto");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/featuresProducto");
const cloudinary = require("cloudinary");

exports.createProducto = catchAsyncErrors(async (req, res, next) => {
  const { nombre, precio, descripcion } = req.body;

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!descripcion) {
    return next(new ErrorHandler("La descripción es obligatoria", 400));
  }

  if (precio <= 0) {
    return next(new ErrorHandler("Ingrese un precio válido ", 400));
  }

  let imagenes = [];
  if (typeof req.body.imagenes === "string") {
    imagenes.push(req.body.imagenes);
  } else {
    imagenes = req.body.imagenes;
  }

  let imagenesLinks = [];

  for (let i = 0; i < imagenes.length; i++) {
    const result = await cloudinary.v2.uploader.upload(imagenes[i], {
      folder: "productos",
      width: 1080,
      height: 1080,
      crop: "scale",
    });

    imagenesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.imagenes = imagenesLinks;
  req.body.usuario = req.usuario.id;

  const producto = await Producto.create(req.body);

  res.status(201).json({
    success: true,
    producto,
  });
});

exports.getProductos = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 2;
  const productosCount = await Producto.countDocuments();

  const apiFeatures = new APIFeatures(Producto.find(), req.query)
    .search()
    .filter();

  let productos = await apiFeatures.query;
  let filteredProductosCount = productos.length;

  apiFeatures.pagination(resPerPage);
  productos = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productosCount,
    resPerPage,
    filteredProductosCount,
    productos,
  });
});

exports.getAdminProductos = catchAsyncErrors(async (req, res, next) => {
  const productos = await Producto.find();

  res.status(200).json({
    success: true,
    productos,
  });
});

exports.getSingleProducto = catchAsyncErrors(async (req, res, next) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    producto,
  });
});

exports.updateProducto = catchAsyncErrors(async (req, res, next) => {
  let producto = await Producto.findById(req.params.id);

  if (!producto) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  let imagenes = [];
  if (typeof req.body.imagenes === "string") {
    imagenes.push(req.body.imagenes);
  } else {
    imagenes = req.body.imagenes;
  }

  if (imagenes !== undefined) {
    for (let i = 0; i < producto.imagenes.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        producto.imagenes[i].public_id
      );
    }

    let imagenesLinks = [];

    for (let i = 0; i < imagenes.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagenes[i], {
        folder: "productos",
        width: 1080,
        height: 1080,
        crop: "scale",
      });

      imagenesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.imagenes = imagenesLinks;
  }

  producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    producto,
  });
});

exports.deleteProducto = catchAsyncErrors(async (req, res, next) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  for (let i = 0; i < producto.imagenes.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      producto.imagenes[i].public_id
    );
  }

  await producto.remove();

  res.status(200).json({
    success: true,
    message: "Producto eliminado",
  });
});

exports.createRevisionProducto = catchAsyncErrors(async (req, res, next) => {
  const { calificacion, comentario, productoId } = req.body;

  const revision = {
    usuario: req.usuario._id,
    nombre: req.usuario.nombre,
    calificacion: Number(calificacion),
    comentario,
  };

  const producto = await Producto.findById(productoId);

  const esRevisado = producto.revisiones.find(
    (r) => r.usuario.toString() === req.usuario._id.toString()
  );

  if (esRevisado) {
    producto.revisiones.forEach((revision) => {
      if (revision.usuario.toString() === req.usuario._id.toString()) {
        revision.comentario = comentario;
        revision.calificacion = calificacion;
      }
    });
  } else {
    producto.revisiones.push(revision);
    producto.numeroRevisiones = producto.revisiones.length;
  }

  producto.calificaciones =
    producto.revisiones.reduce((acc, item) => item.calificacion + acc, 0) /
    producto.revisiones.length;

  await producto.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getRevisionesProducto = catchAsyncErrors(async (req, res, next) => {
  const producto = await Producto.findById(req.query.id);

  res.status(200).json({
    success: true,
    revisiones: producto.revisiones,
  });
});

exports.deleteRevision = catchAsyncErrors(async (req, res, next) => {
  const producto = await Producto.findById(req.query.productoId);

  console.log(producto);

  const revisiones = producto.revisiones.filter(
    (revision) => revision._id.toString() !== req.query.id.toString()
  );

  const numeroRevisiones = revisiones.length;

  const calificaciones =
    producto.revisiones.reduce((acc, item) => item.calificacion + acc, 0) /
    revisiones.length;

  await Producto.findByIdAndUpdate(
    req.query.productoId,
    {
      revisiones,
      calificaciones,
      numeroRevisiones,
    },
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
