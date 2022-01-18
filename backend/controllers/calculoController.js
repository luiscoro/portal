const Calculo = require("../models/calculo");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createCalculo = catchAsyncErrors(async (req, res, next) => {

    const calculo = await Calculo.create(req.body);

    res.status(201).json({
        success: true,
        calculo,
    });
});

exports.getAdminCalculos = catchAsyncErrors(async (req, res, next) => {
    const calculos = await Calculo.findOne().sort({ field: 'asc', _id: -1 }).limit(1);

    res.status(200).json({
        success: true,
        calculos,
    });
});

