exports.equipoTest = function (nombre){
    console.log("Dato de entrada: "+nombre)
    if (!nombre) 
        return "El nombre es obligatorio";
      else
      return "El nombre fue ingresado"
}

exports.puntosTest = function (puntos){
    console.log("Dato de entrada: "+puntos)
    if (!golesd) 
        return "Los puntos es obligatorio";
      else
      return "Los puntos fueron ingresados"
}

exports.golDiferenciaTest = function (golesd){
    console.log("Dato de entrada: "+golesd)
    if (!golesd) 
        return "Los goles de diferencia son obligatorios";
      else
      return "Los goles de diferencia fueron ingresados"
}