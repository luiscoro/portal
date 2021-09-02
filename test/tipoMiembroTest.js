var chai = require("chai");
var assert = chai.assert;
var functionMiembro = require("./funciones/miembro.js");

describe("Testeo del componente Miembro: ", function () {
    describe("Revisión a la función tipoTest", function () {
      it("Se verifica que exista un tipo : assert.equal(value) ", function () {
        result = functionMiembro.tipoTest(null);
        assert.equal(result, "El tipo de miembro seleccionado no es válido");
      });
    });
});

//CUANDO LOS CASOS DE PRUEBA NO SE CUMPLEN

describe("Testeo del componente Miembro: ", function () {
    describe("Revisión a la función tipoTest", function () {
      it("Se verifica que exista un tipo : assert.equal(value) ", function () {
        result = functionMiembro.tipoTest("tipo de prueba");
        assert.equal(result, "El tipo de miembro seleccionado no es válido");
      });
    });
});
