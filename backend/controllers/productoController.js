const Producto = require("../models/producto");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/featuresProducto");
const cloudinary = require("cloudinary");

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(n);
}

function validPrecio(precio) {
  return /^\d{1,3}(?:,\d{3})*$/.test(precio);
}

function validCantidad(num) {
  return /^-?[0-9]+$/.test(num);
}

exports.createProducto = catchAsyncErrors(async (req, res, next) => {
  const { categoria, nombre, precio, stock, descripcion } = req.body;

  if (!categoria) {
    return next(
      new ErrorHandler("La categoría seleccionada no es válida", 400)
    );
  }

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!descripcion) {
    return next(new ErrorHandler("La descripción es obligatoria", 400));
  }

  if (precio < 1 || precio > 100) {
    return next(
      new ErrorHandler(
        "El precio solo admite valores entre 1 y 100 dólares",
        400
      )
    );
  }

  if (!validPrecio(precio)) {
    return next(
      new ErrorHandler(
        "El precio no es válido",
        400
      )
    );
  }

  if (!validCantidad(stock) || stock < 0 || stock > 100) {
    return next(
      new ErrorHandler(
        "La cantidad existente debe ser válida y solo se admite valores entre 0 y 100",
        400
      )
    );
  }


  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras, números y espacios", 400)
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

  if (req.body.tallas !== undefined) {
    let tallas = [];
    if (typeof req.body.tallas === "string") {
      tallas.push(req.body.tallas);
    } else {
      tallas = req.body.tallas;
    }

    let tallasPro = [];

    for (let i = 0; i < tallas.length; i++) {
      tallasPro.push({
        talla: tallas[i],
      });
    }

    req.body.tallas = tallasPro;
  } else {
    req.body.tallas = [];
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

  const producto = await Producto.create(req.body);

  res.status(201).json({
    success: true,
    producto,
  });
});

exports.getProductos = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productosCount = await Producto.countDocuments();

  const apiFeatures = new APIFeatures(Producto.find().populate(
    "categoria",
    "estado"), req.query)
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
  const productos = await Producto.find().populate(
    "categoria",
    "nombre estado");

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

  if (!req.body.categoria) {
    return next(
      new ErrorHandler("La categoría seleccionada no es válida", 400)
    );
  }

  if (!req.body.nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!req.body.descripcion) {
    return next(new ErrorHandler("La descripción es obligatoria", 400));
  }

  if (req.body.precio < 1 || req.body.precio > 100) {
    return next(
      new ErrorHandler(
        "El precio solo admite valores entre 1 y 100 dólares",
        400
      )
    );
  }

  if (!validPrecio(req.body.precio)) {
    return next(
      new ErrorHandler(
        "El precio no es válido",
        400
      )
    );
  }

  if (!validCantidad(req.body.stock) || req.body.stock < 0 || req.body.stock > 100) {
    return next(
      new ErrorHandler(
        "La cantidad existente debe ser válida y solo se admite valores entre 0 y 100",
        400
      )
    );
  }


  if (!validNombre(req.body.nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras, números y espacios", 400)
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

  if (req.body.tallas !== undefined) {
    let tallas = [];
    if (typeof req.body.tallas === "string") {
      tallas.push(req.body.tallas);
    } else {
      tallas = req.body.tallas;
    }

    let tallasPro = [];

    for (let i = 0; i < tallas.length; i++) {
      tallasPro.push({
        talla: tallas[i],
      });
    }
    req.body.tallas = tallasPro;
  } else {
    req.body.tallas = [];
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
  const newProductoData = {
    estado: "inactivo",
  };

  const producto = await Producto.findByIdAndUpdate(
    req.params.id,
    newProductoData,
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

exports.createRevisionProducto = catchAsyncErrors(async (req, res, next) => {
  const { calificacion, comentario, productoId } = req.body;

  if (!calificacion) {
    return next(new ErrorHandler("La calificación es obligatoria", 400));
  }

  if (comentario != "") {
    if (!validNombre(comentario)) {
      return next(
        new ErrorHandler(
          "El comentario solo admite letras, números y espacios",
          400
        )
      );
    }
  }

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
