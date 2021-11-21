const TipoMiembro = require("../models/tipoMiembro");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

function validNombre(n) {
    return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/.test(n);
}

exports.createTipoMiembro = catchAsyncErrors(async (req, res, next) => {
    const { nombre } = req.body;

    if (!nombre) {
        return next(new ErrorHandler("El nombre es obligatorio", 400));
    }

    if (!validNombre(nombre)) {
        return next(
            new ErrorHandler("El nombre solo admite letras y espacios", 400)
        );
    }

    const tipoMiembro = await TipoMiembro.create(req.body);

    res.status(201).json({
        success: true,
        tipoMiembro,
    });
});

exports.getAdminTipoMiembros = catchAsyncErrors(async (req, res, next) => {
    const tipoMiembros = await TipoMiembro.find();

    res.status(200).json({
        success: true,
        tipoMiembros,
    });
});

exports.getSingleTipoMiembro = catchAsyncErrors(async (req, res, next) => {
    const tipoMiembro = await TipoMiembro.findById(req.params.id);

    if (!tipoMiembro) {
        return next(new ErrorHandler("Tipo de miembro no encontrado", 404));
    }

    res.status(200).json({
        success: true,
        tipoMiembro,
    });
});

exports.updateTipoMiembro = catchAsyncErrors(async (req, res, next) => {
    const { nombre, estado } = req.body;

    if (!nombre) {
        return next(new ErrorHandler("El nombre es obligatorio", 400));
    }

    if (!validNombre(nombre)) {
        return next(
            new ErrorHandler("El nombre solo admite letras y espacios", 400)
        );
    }

    const newTipoMiembroData = {
        nombre: nombre,
        estado: estado,
    };

    const tipoMiembro = await TipoMiembro.findByIdAndUpdate(
        req.params.id,
        newTipoMiembroData,
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

exports.deleteTipoMiembro = catchAsyncErrors(async (req, res, next) => {
    const newTipoMiembroData = {
        estado: "inactivo",
    };

    const tipoMiembro = await TipoMiembro.findByIdAndUpdate(
        req.params.id,
        newTipoMiembroData,
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