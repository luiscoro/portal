const mongoose = require("mongoose");

const posicionSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Posicion", posicionSchema);
