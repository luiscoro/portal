var chai = require("chai");
var assert = chai.assert;
var functionMiembro = require("./funciones/miembro.js");

describe("Testeo del componente Miembro: ", function () {
    describe("Revisión a la función posicionTest", function () {
      it("Se verifica que exista una posicion : assert.equal(value) ", function () {
        result = functionMiembro.posicionTest(null);
        assert.equal(result, "La posición seleccionada no es válida");
      });
    });
});

//CUANDO LOS CASOS DE PRUEBA NO SE CUMPLEN
describe("Testeo del componente Miembro: ", function () {
    describe("Revisión a la función posicionTest", function () {
      it("Se verifica que exista una posicion : assert.equal(value) ", function () {
        result = functionMiembro.posicionTest(9);
        assert.equal(result, "La posición seleccionada no es válida");
      });
    });
});
