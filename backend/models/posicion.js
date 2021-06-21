const mongoose = require("mongoose");

const posicionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Posicion", posicionSchema);
