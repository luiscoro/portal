const Usuario = require("../models/usuario");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Verificar si el usuario ha iniciado sesión
exports.authenticatedUsuario = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("Inicia sesión para comprar en nuestra tienda.", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.usuario = await Usuario.findById(decoded.id);

  next();
});

// Autorización del rol a un recurso
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return next(
        new ErrorHandler(
          `El rol (${req.usuario.rol}) no tiene permisos para acceder a este recurso`,
          403
        )
      );
    }
    next();
  };
};
