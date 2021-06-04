const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = mongoose.model("Categoria", categoriaSchema);
