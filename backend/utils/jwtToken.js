// Creación y almacenamiento del token en la cookie
const sendToken = (usuario, statusCode, res) => {
  // Generación del token
  const token = usuario.getJwtToken();

  /* var d = new Date();
  d.setHours(d.getHours() - 5); */

  // Expiración de la cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 19 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    usuario,
  });
};

module.exports = sendToken;
