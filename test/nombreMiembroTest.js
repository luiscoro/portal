var chai = require("chai");
var assert = chai.assert;
var functionMiembro = require("./funciones/miembro.js");

describe("Testeo del componente Miembro: ", function () {
    describe("Revisión a la función nombreTest", function () {
      it("Se verifica que exista un nombre : assert.equal(value) ", function () {
        result = functionMiembro.nombreTest(null);
        assert.equal(result, "El nombre es obligatorio");
      });
    });
});


//CUANDO LOS CASOS DE PRUEBA NO SE CUMPLEN

describe("Testeo del componente Miembro: ", function () {
    describe("Revisión a la función nombreTest", function () {
      it("Se verifica que exista un nombre : assert.equal(value) ", function () {
        result = functionMiembro.nombreTest("Jose Ortiz");
        assert.equal(result, "El nombre es obligatorio");
      });
    });
});
