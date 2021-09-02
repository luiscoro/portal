var chai = require("chai");
var assert = chai.assert;
var functionClasificacion = require("./funciones/Clasificacion.js");

describe("Testeo del componente Clasificacion: ", function () {
    describe("Revisión a la función puntosTest", function () {
      it("Se verifica que existan puntos : assert.equal(value) ", function () {
        result = functionClasificacion.puntosTest(null);
        assert.equal(result, "Los puntos es obligatorio");
      });
    });
});