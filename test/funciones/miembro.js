exports.posicionTest = function(posicion){
    console.log("Dato de entrada: "+posicion)
    if (!posicion) 
        return "La posición seleccionada no es válida";
      else
      return "La posición seleccionada es válida"
}

exports.tipoTest = function(tipo){
    console.log("Dato de entrada: "+tipo)
    if (!tipo) 
        return "El tipo de miembro seleccionado no es válido";
      else
      return "El tipo de miembro seleccionado es válido"
}

exports.nombreTest = function(nombre){
    console.log("Dato de entrada: "+nombre)
    if (!nombre) 
        return "El nombre es obligatorio";
      else
      return "El nombre fue ingresado"
}