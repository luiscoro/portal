var chai = require("chai");
var assert = chai.assert;
var functionPartido = require("./funciones/partido.js");

describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función estadioTest", function () {
      it("Se verifica que el nombre del estadio sea adecuado: assert.equal(value) ", function () {
        result = functionPartido.estadioTest("*El super_3");
        assert.equal(result, "El nombre del estadio solo admite letras, números y espacios");
      });
    });
});

describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función estadioVacioTest", function () {
      it("Se verifica que el nombre del estadio no sea nulo o vacio: assert.equal(value) ", function () {
        result = functionPartido.estadioVacioTest(null);
        assert.equal(result, "El nombre del estadio no puede estar vacío");
      });
    });
});
