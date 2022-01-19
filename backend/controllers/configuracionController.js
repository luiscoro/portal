const Configuracion = require("../models/configuracion");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

function validValor(valor) {
    return /^\d{1,3}(?:,\d{3})*$/.test(valor);
}

exports.getAdminConfiguracion = catchAsyncErrors(async (req, res, next) => {
    const configuracion = await Configuracion.findOne().sort({ field: 'asc', _id: -1 }).limit(1);

    res.status(200).json({
        success: true,
        configuracion,
    });
});

exports.updateConfiguracion = catchAsyncErrors(async (req, res, next) => {
    const { porcentajeIva, costoEnvio } = req.body;

    if (!porcentajeIva) {
        return next(new ErrorHandler("Ingresa el porcentaje de iva", 401));
    }

    if (porcentajeIva < 1 || porcentajeIva > 20) {
        return next(new ErrorHandler("El porcentaje de IVA debe estar entre el 1 y 20 %", 400));
    }

    if (!validValor(porcentajeIva)) {
        return next(
            new ErrorHandler(
                "El porcentaje de IVA no es válido",
                400
            )
        );
    }

    if (!costoEnvio) {
        return next(new ErrorHandler("Ingresa el costo de envío", 401));
    }

    if (costoEnvio < 5 && costoEnvio > 20) {
        return next(new ErrorHandler("El costo de envío debe estar entre 5 y 20 dólares", 401));
    }

    if (!validValor(costoEnvio)) {
        return next(
            new ErrorHandler(
                "El costo de envío no es válido",
                400
            )
        );
    }


    const newConfiguracionData = {
        porcentajeIva: porcentajeIva,
        costoEnvio: costoEnvio
    };

    const configuracion = await Configuracion.findByIdAndUpdate(
        req.body.id,
        newConfiguracionData,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );;

    res.status(201).json({
        success: true,
    });
});


