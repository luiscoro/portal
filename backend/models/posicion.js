const mongoose = require("mongoose");

const posicionSchema = new mongoose.Schema({
  tipo: {
    type: mongoose.Schema.ObjectId,
    ref: "TipoMiembro",
    required: true,
  },
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
  estado: {
    type: String,
    default: "activa",
  },
});

module.exports = mongoose.model("Posicion", posicionSchema);
