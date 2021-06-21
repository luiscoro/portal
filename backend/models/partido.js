const mongoose = require("mongoose");

const partidoSchema = new mongoose.Schema({
  logoLocal: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  nombreLocal: {
    type: String,
    trim: true,
  },
  golesLocal: {
    type: Number,
  },
  logoVisitante: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  nombreVisitante: {
    type: String,
    trim: true,
  },
  golesVisitante: {
    type: Number,
  },
  fecha: {
    type: String,
  },
  hora: {
    type: String,
  },
  estadio: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Partido", partidoSchema);
