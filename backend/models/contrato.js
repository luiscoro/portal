const mongoose = require("mongoose");

const contratoSchema = new mongoose.Schema({
    miembro: {
        type: mongoose.Schema.ObjectId,
        ref: "Miembro",
        required: true,
    },
    tipo: {
        type: String,
    },
    sueldo: {
        type: Number,
        default: 0.0,
    },
    fechaInicio: {
        type: Date,
    },
    fechaFin: {
        type: Date,
    },
    estado: {
        type: String,
        default: "vigente",
    },
});

module.exports = mongoose.model("Contrato", contratoSchema);
