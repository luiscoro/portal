const mongoose = require("mongoose");

var d = new Date();
d.setHours(d.getHours() - 5);

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Ingrese el nombre"],
    trim: true,
    maxLength: [100, "El nombre no puede exceder los 100 caracteres"],
  },
  precio: {
    type: Number,
    required: [true, "Ingrese el precio"],
    default: 0.0,
  },
  descripcion: {
    type: String,
    required: [true, "Ingrese la descripción"],
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
    required: [true, "Seleccione la categoría del producto"],
    enum: {
      values: ["Camisetas", "Uniformes", "Calentadores", "Accesorios"],
      message: "Seleccione una categoría correcta",
    },
  },
  marca: {
    type: String,
    required: [false, "Ingrese la marca del producto"],
  },
  stock: {
    type: Number,
    required: [true, "Ingrese el stock del producto"],
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
