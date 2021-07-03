const Miembro = require("../models/miembro");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/.test(n);
}

exports.createMiembro = catchAsyncErrors(async (req, res, next) => {
  const { posicion, tipo, nombre, foto } = req.body;

  if (!posicion) {
    return next(new ErrorHandler("La posición seleccionada no es válida", 400));
  }

  if (!tipo) {
    return next(
      new ErrorHandler("El tipo de miembro seleccionado no es válido", 400)
    );
  }

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (foto === "") {
    return next(new ErrorHandler("La foto es obligatoria", 400));
  }

  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras y espacios", 400)
    );
  }

  let fotoLink = {};

  const result = await cloudinary.v2.uploader.upload(foto, {
    folder: "miembros",
    width: 200,
    height: 400,
    crop: "scale",
  });

  fotoLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.foto = fotoLink;

  const miembro = await Miembro.create(req.body);

  res.status(201).json({
    success: true,
    miembro,
  });
});

exports.getJugadores = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find({ tipo: "Jugador" });

  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getCuerpoTecnico = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find({ tipo: "Cuerpo técnico" });

  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getCuerpoMedico = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find({ tipo: "Cuerpo médico" });

  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getAdminMiembros = catchAsyncErrors(async (req, res, next) => {
  const miembros = await Miembro.find();
  res.status(200).json({
    success: true,
    miembros,
  });
});

exports.getSingleMiembro = catchAsyncErrors(async (req, res, next) => {
  const miembro = await Miembro.findById(req.params.id);

  if (!miembro) {
    return next(new ErrorHandler("Miembro no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    miembro,
  });
});

exports.updateMiembro = catchAsyncErrors(async (req, res, next) => {
  let miembro = await Miembro.findById(req.params.id);

  if (!miembro) {
    return next(new ErrorHandler("Miembro no encontrado", 404));
  }

  const { posicion, tipo, nombre } = req.body;

  if (!posicion) {
    return next(new ErrorHandler("La posición seleccionada no es válida", 400));
  }

  if (!tipo) {
    return next(
      new ErrorHandler("El tipo de miembro seleccionado no es válido", 400)
    );
  }

  if (!nombre) {
    return next(new ErrorHandler("El nombre es obligatorio", 400));
  }

  if (!validNombre(nombre)) {
    return next(
      new ErrorHandler("El nombre solo admite letras y espacios", 400)
    );
  }

  const newMiembroData = {
    posicion: posicion,
    tipo: tipo,
    nombre: nombre,
    numeroCamiseta: req.body.numeroCamiseta,
    fechaNacimiento: req.body.fechaNacimiento,
    nacionalidad: req.body.nacionalidad,
  };

  if (req.body.foto !== "") {
    const foto_id = miembro.foto.public_id;
    const res = await cloudinary.v2.uploader.destroy(foto_id);

    const result = await cloudinary.v2.uploader.upload(req.body.foto, {
      folder: "miembros",
      width: 200,
      height: 400,
      crop: "scale",
    });

    newMiembroData.foto = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  miembro = await Miembro.findByIdAndUpdate(req.params.id, newMiembroData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteMiembro = catchAsyncErrors(async (req, res, next) => {
  const miembro = await Miembro.findById(req.params.id);

  if (!miembro) {
    return next(new ErrorHandler("Miembro no encontrado", 404));
  }
  const foto_id = miembro.foto.public_id;
  await cloudinary.v2.uploader.destroy(foto_id);

  await miembro.remove();

  res.status(200).json({
    success: true,
  });
});
