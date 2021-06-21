const mongoose = require("mongoose");

var d = new Date();
d.setHours(d.getHours() - 5);

const productoSchema = new mongoose.Schema({
  categoria: {
    type: mongoose.Schema.ObjectId,
    ref: "Categoria",
    required: true,
  },
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
  precio: {
    type: Number,
    default: 0.0,
  },
  descripcion: {
    type: String,
  },
  calificaciones: {
    type: Number,
    default: 0,
  },
  imagenes: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  marca: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    default: 0,
  },
  numeroRevisiones: {
    type: Number,
    default: 0,
  },
  revisiones: [
    {
      usuario: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      calificacion: {
        type: Number,
        required: true,
      },
      comentario: {
        type: String,
        required: true,
      },
    },
  ],
  fechaCreacion: {
    type: Date,
    default: d,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
