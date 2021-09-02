exports.golesTest = function (goles) {
    console.log("Dato de entrada: "+goles)
  if (goles < 0) return "La cantidad de goles no puede ser menor a cero";
  else return "La cantidad de goles fue mayor o igual a cero";
};

exports.fechaTest = function (fecha) {
    console.log("Dato de entrada: "+fecha)
  var fechaPartido = new Date(fecha);
  var fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() - 1);
  fechaActual.setHours(0, 0, 0, 0);
  if (fechaPartido < fechaActual)
    return "La fecha del partido no puede ser menor a la fecha actual";
  else return "La fecha del partido fue mayor o igual a la fecha actual";
};

exports.horaVaciaTest = function (hora){
    console.log("Dato de entrada: "+hora)
  if (hora === null) {
    return "La hora seleccionada no es válida";
  }else{
      return "La hora seleccionada ya no esta vacía, fue llenada"
  }
};
exports.horaTest = function (hora) {
    console.log("Dato de entrada: "+hora)
    
  if (hora < "09:00" || hora > "19:00") 
    return "La hora debe estar entre las 09:00 y 19:00";
  else
  return "La hora estuvo dentro del rango de 09:00 y 19:00"
};



function validNombre(n) {
    return /^[a-zA-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(n);
  }

  exports.estadioTest = function (nombreEstadio){
      console.log("Dato de entrada: "+nombreEstadio)
      if(!validNombre(nombreEstadio))
          return "El nombre del estadio solo admite letras, números y espacios"
          else
          return "El nombre del estadio fue ingresado"
  }
  exports.estadioVacioTest = function (nombreEstadio){
    console.log("Dato de entrada: "+nombreEstadio)
    if(nombreEstadio===null)
        return "El nombre del estadio no puede estar vacío"
        else
        return "El nombre del estadio fue llenado"
}