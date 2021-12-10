const mongoose = require("mongoose");
var d = new Date();
d.setHours(d.getHours() - 5);

const miembroSchema = new mongoose.Schema({
  posicion: {
    type: mongoose.Schema.ObjectId,
    ref: "Posicion",
    required: true,
  },
  tipo: {
    type: mongoose.Schema.ObjectId,
    ref: "TipoMiembro",
    required: true,
  },
  nombre: {
    type: String,
    trim: true,
    unique: true,
  },
  cedula: {
    type: String,
    unique: true,
  },
  numeroCamiseta: {
    type: Number,
  },
  fechaNacimiento: {
    type: Date,
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
  estado: {
    type: String,
    default: "activo",
  },
});

module.exports = mongoose.model("Miembro", miembroSchema);
