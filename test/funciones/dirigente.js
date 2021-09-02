exports.nombreTest = function(nombre){
    console.log("Dato de entrada: "+nombre)
    if (!nombre) 
        return "El nombre es obligatorio";
      else
      return "El nombre fue ingresado"
}

exports.cargoTest = function(cargo){
    console.log("Dato de entrada: "+cargo)
    if (!cargo) 
        return "El cargo es obligatorio";
      else
      return "El cargo fue ingresado"
}