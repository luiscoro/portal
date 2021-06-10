const mongoose = require("mongoose");

const miembroSchema = new mongoose.Schema({
  posicion: {
    type: mongoose.Schema.ObjectId,
    ref: "Posicion",
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    trim: true,
  },
  numeroCamiseta: {
    type: Number,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  nacionalidad: {
    type: String,
  },
  foto: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = mongoose.model("Miembro", miembroSchema);
