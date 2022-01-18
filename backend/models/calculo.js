const mongoose = require("mongoose");

const calculoSchema = new mongoose.Schema({
    porcentajeIva: {
        type: Number,
        default: 0.0,
    },
    costoEnvio: {
        type: Number,
        default: 0.0,
    },
});

module.exports = mongoose.model("Calculo", calculoSchema);