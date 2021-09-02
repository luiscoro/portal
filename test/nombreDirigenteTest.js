var chai = require("chai");
var assert = chai.assert;
var functionDirigente = require("./funciones/Dirigente.js");

describe("Testeo del componente Dirigente: ", function () {
    describe("Revisión a la función nombreTest", function () {
      it("Se verifica que exista un nombre : assert.equal(value) ", function () {
        result = functionDirigente.nombreTest(null);
        assert.equal(result, "El nombre es obligatorio");
      });
    });
});

//CUANDO LOS CASOS DE PRUEBA NO SE CUMPLEN


describe("Testeo del componente Dirigente: ", function () {
    describe("Revisión a la función nombreTest", function () {
      it("Se verifica que exista un nombre : assert.equal(value) ", function () {
        result = functionDirigente.nombreTest("Pepe Pancho");
        assert.equal(result, "El nombre es obligatorio");
      });
    });
});
