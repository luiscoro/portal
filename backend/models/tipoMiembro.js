const mongoose = require("mongoose");

const tipoMiembroSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        trim: true,
    },
    estado: {
        type: String,
        default: "activo",
    },
});

module.exports = mongoose.model("TipoMiembro", tipoMiembroSchema);