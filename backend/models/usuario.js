const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var d = new Date();
d.setHours(d.getHours() - 5);

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Ingrese el nombre"],
    unique: false,
    maxLength: [50, "El nombre no puede exceder los 50 caracteres"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Ingrese un correo válido"],
  },
  password: {
    type: String,
    required: [true, "Ingrese la contraseña"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false,
  },
  rol: {
    type: String,
    default: "registrado",
  },
  fechaCreacion: {
    type: Date,
    default: d,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

usuarioSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

usuarioSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

usuarioSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
