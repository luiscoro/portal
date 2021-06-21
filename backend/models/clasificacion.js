const mongoose = require("mongoose");

const clasificacionSchema = new mongoose.Schema({
  equipo: {
    type: String,
    unique: true,
    trim: true,
  },
  puntos: {
    type: Number,
    trim: true,
  },
  golDiferencia: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model("Clasificacion", clasificacionSchema);
