const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DESARROLLO") {
    console.log(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCCION") {
    let error = { ...err };

    error.message = err.message;

    // Mensaje en caso de que el id de la colección sea inválido
    if (err.name === "CastError") {
      const message = `Recurso no encontrado. Inválido: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Mensaje para validar los campos de las colecciones
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Mensaje en caso de ingresar un campo único duplicado
    if (err.code === 11000) {
      const message = `Duplicado ${Object.keys(err.keyValue)} ingresado`;
      error = new ErrorHandler(message, 400);
    }

    // Mensaje en caso de token inválido
    if (err.name === "JsonWebTokenError") {
      const message = "El token es inválido. Vuelva a intentarlo!!!";
      error = new ErrorHandler(message, 400);
    }

    // Mensaje en caso de token ya expirado
    if (err.name === "TokenExpiredError") {
      const message = "El token ya ha expirado. Vuelva a intentarlo!!!";
      error = new ErrorHandler(message, 400);
    }

    //Mensaje cuando aparece algún nuevo error
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error interno del servidor",
    });
  }
};
