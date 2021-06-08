const mongoose = require("mongoose");

const dirigenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  cargo: {
    type: String,
    trim: true,
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

module.exports = mongoose.model("Dirigente", dirigenteSchema);
