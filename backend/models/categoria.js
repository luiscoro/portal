const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
  estado: {
    type: String,
    default: "activa",
  },
});

module.exports = mongoose.model("Categoria", categoriaSchema);
