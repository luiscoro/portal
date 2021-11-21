const mongoose = require("mongoose");

var d = new Date();
d.setHours(d.getHours() - 5);

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    unique: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  imagen: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  fecha: {
    type: Date,
    default: d,
  },
  estado: {
    type: String,
    default: "activa",
  },
});

module.exports = mongoose.model("Noticia", noticiaSchema);
