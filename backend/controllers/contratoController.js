const Contrato = require("../models/contrato");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


exports.createContrato = catchAsyncErrors(async (req, res, next) => {


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
    const { tipo } = req.body;

    if (!tipo) {
        return next(new ErrorHandler("El tipo es obligatorio", 400));
    }

    const newContratoData = {
        tipo: tipo,
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
