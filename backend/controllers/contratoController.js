const Contrato = require("../models/contrato");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

function validSueldo(sueldo) {
    return /^\d{1,3}(?:,\d{3})*$/.test(sueldo);
}

var fechaActual = new Date();
fechaActual.setDate(fechaActual.getDate() - 1);
fechaActual.setHours(0, 0, 0, 0);

var fechaDespues = new Date();
fechaDespues.setDate(fechaDespues.getDate() - 1);
fechaDespues.setHours(0, 0, 0, 0);
fechaDespues.setMonth(fechaDespues.getMonth() + 1);

exports.createContrato = catchAsyncErrors(async (req, res, next) => {

    const { miembro, tipo, sueldo, fechaInicio, fechaFin } = req.body;

    const contr = await Contrato.findOne({ 'miembro': miembro });

    var fechaIn = new Date(fechaInicio);

    if (!miembro) {
        return next(new ErrorHandler("El miembro seleccionado no es válido", 400));
    }

    if (contr) {
        if (fechaActual.getFullYear() === fechaIn.getFullYear()) {
            return next(new ErrorHandler("Ya existe un registro con el miembro ingresado", 400));
        }
    }

    if (!tipo) {
        return next(
            new ErrorHandler("El tipo de contrato seleccionado no es válido", 400)
        );
    }

    if (sueldo < 200 || sueldo > 5000) {
        return next(
            new ErrorHandler("El sueldo debe estar entre 200 y 5000", 400)
        );
    }

    if (!validSueldo(sueldo)) {
        return next(
            new ErrorHandler(
                "El sueldo no es válido",
                400
            )
        );
    }

    if (fechaInicio === "") {
        return next(new ErrorHandler("La fecha de inicio es obligatoria", 400));
    }


    if (fechaIn < fechaActual) {

        return next(new ErrorHandler("La fecha de inicio no puede ser menor a la fecha actual", 400));
    }

    if (tipo === "definido") {
        if (fechaFin === "") {
            return next(new ErrorHandler("La fecha de fin es obligatoria", 400));
        }

        var fechaF = new Date(fechaFin);

        if (fechaF < fechaIn) {

            return next(new ErrorHandler("La fecha de fin no puede ser menor a la fecha de inicio", 400));
        }

        if (fechaF < fechaDespues) {

            return next(new ErrorHandler("El tiempo de contrato debe ser al menos de 1 mes", 400));
        }
    }

    const contrato = await Contrato.create(req.body);

    res.status(201).json({
        success: true,
        contrato,
    });
});

exports.getAdminContratos = catchAsyncErrors(async (req, res, next) => {
    const contratos = await Contrato.find().populate(
        "miembro",
        "tipo cedula nombre nacionalidad estado fechaNacimiento posicion"
    ); res.status(200).json({
        success: true,
        contratos,
    });
});

exports.getSingleContrato = catchAsyncErrors(async (req, res, next) => {
    const contrato = await Contrato.findById(req.params.id).populate(
        "miembro",
        "nombre");

    if (!contrato) {
        return next(new ErrorHandler("Contrato no encontrado", 404));
    }

    res.status(200).json({
        success: true,
        contrato,
    });
});

exports.updateContrato = catchAsyncErrors(async (req, res, next) => {
    const { tipo, sueldo, estado, fechaInicio, fechaFin } = req.body;
    var fechaIn = new Date(fechaInicio);

    if (sueldo < 200 || sueldo > 5000) {
        return next(
            new ErrorHandler("El sueldo debe estar entre 200 y 5000", 400)
        );
    }

    if (!validSueldo(sueldo)) {
        return next(
            new ErrorHandler(
                "El sueldo no es válido",
                400
            )
        );
    }


    if (fechaInicio === "") {
        return next(new ErrorHandler("La fecha de inicio es obligatoria", 400));
    }


    if (fechaIn < fechaActual) {

        return next(new ErrorHandler("La fecha de inicio no puede ser menor a la fecha actual", 400));
    }

    if (tipo === "definido") {
        if (fechaFin === "") {
            return next(new ErrorHandler("La fecha de fin es obligatoria", 400));
        }

        var fechaF = new Date(fechaFin);

        if (fechaF < fechaIn) {

            return next(new ErrorHandler("La fecha de fin no puede ser menor a la fecha de inicio", 400));
        }

        if (fechaF < fechaDespues) {

            return next(new ErrorHandler("El tiempo de contrato debe ser al menos de 1 mes", 400));
        }
    }


    const newContratoData = {
        tipo: tipo,
        sueldo: sueldo,
        estado: estado,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
    };

    const contrato = await Contrato.findByIdAndUpdate(
        req.params.id,
        newContratoData,
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

exports.deleteContrato = catchAsyncErrors(async (req, res, next) => {
    const newContratoData = {
        estado: "terminado",
    };

    const contrato = await Contrato.findByIdAndUpdate(
        req.params.id,
        newContratoData,
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
