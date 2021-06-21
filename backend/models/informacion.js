const mongoose = require("mongoose");

const informacionSchema = new mongoose.Schema({
  imagenPrincipal: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  lemaPrincipal: {
    type: String,
    trim: true,
  },
  lemaSecundario: {
    type: String,
    trim: true,
  },
  videoPrincipal: {
    type: String,
    trim: true,
    required: true,
  },
  bannerVideo: {
    type: String,
    trim: true,
  },
  imagenAcerca: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  emblemaAcerca: {
    type: String,
    trim: true,
  },
  mision: {
    type: String,
    trim: true,
  },
  vision: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Informacion", informacionSchema);
