const mongoose = require("mongoose");

const dirigenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    unique: true,
  },
  cargo: {
    type: String,
    trim: true,
    unique: true,
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
});

module.exports = mongoose.model("Dirigente", dirigenteSchema);
