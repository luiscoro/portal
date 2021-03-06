const mongoose = require("mongoose");

const auspicianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
  logo: {
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

module.exports = mongoose.model("Auspiciante", auspicianteSchema);
