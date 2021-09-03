function validNombre(n) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/.test(n);
}

function validCedula(cedula) {
  var res = 0;
  var cad = cedula;
  var total = 0;
  var longitud = cad.length;
  var longcheck = longitud - 1;

  if (cad !== "" && longitud === 10) {
    for (i = 0; i < longcheck; i++) {
      if (i % 2 === 0) {
        var aux = cad.charAt(i) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } else {
        total += parseInt(cad.charAt(i));
      }
    }

    total = total % 10 ? 10 - (total % 10) : 0;

    if (cad.charAt(longitud - 1) == total) {
      res = 1;
    }
    return res;
  }
}

exports.nombreUsuarioTest = function (nombreUsuario) {
  if (!validNombre(nombreUsuario))
    return "El nombre del usuario solo admite letras y espacios";
  else return "El nombre del usuario fue ingresado";
};
exports.nombreVacioUsuarioTest = function (nombreUsuario) {
  if (nombreUsuario === null) return "El nombre del usuario es obligatorio";
  else return "El nombre del estadio fue llenado";
};

exports.cedulaUsuarioTest = function (cedula) {
  if (validCedula(cedula) == 0) return "El número de cédula no es válido";
  else return "El número de cédula es válido";
};
