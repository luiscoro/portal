var chai = require("chai");
var assert = chai.assert;
var functionClasificacion = require("./funciones/Clasificacion.js");

describe("Testeo del componente Clasificacion: ", function () {
    describe("Revisión a la función golDiferenciaTest", function () {
      it("Se verifica que existan goles de diferencia : assert.equal(value) ", function () {
        result = functionClasificacion.golDiferenciaTest(null);
        assert.equal(result, "Los goles de diferencia son obligatorios");
      });
    });
});