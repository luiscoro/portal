const mongoose = require("mongoose");

var d = new Date();
d.setHours(d.getHours() - 5);

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
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
  categoria: {
    type: String,
    required: [true, "Seleccione una categoría correcta"],
    enum: {
      values: ["Camisetas", "Uniformes", "Calentadores", "Accesorios"],
    },
  },
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
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: d,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
