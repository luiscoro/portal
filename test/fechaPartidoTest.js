var chai = require("chai");
var assert = chai.assert;
var functionPartido = require("./funciones/partido.js");

describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función fechaTest", function () {
      it("Se verifica que la fecha no sea menor a la fecha actual : assert.equal(value, value): ", function () {
        result = functionPartido.fechaTest('December 17, 1995 03:24:00');
        assert.equal(result, "La fecha del partido no puede ser menor a la fecha actual");
      });
    });
});


// CASOS DE PRUEBA CUANDO NO SE CUMPLEN

describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función fechaTest", function () {
      it("Se verifica que la fecha no sea menor a la fecha actual : assert.equal(value, value): ", function () {
        result = functionPartido.fechaTest('December 05, 2021 00:00:00');
        assert.equal(result, "La fecha del partido no puede ser menor a la fecha actual");
      });
    });
});