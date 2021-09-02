var chai = require("chai");
var assert = chai.assert;
var functionDirigente = require("./funciones/Dirigente.js");

describe("Testeo del componente Dirigente: ", function () {
    describe("Revisión a la función cargoTest", function () {
      it("Se verifica que exista un cargo : assert.equal(value) ", function () {
        result = functionDirigente.cargoTest(null);
        assert.equal(result, "El cargo es obligatorio");
      });
    });
});