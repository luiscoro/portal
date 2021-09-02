var chai = require("chai");
var assert = chai.assert;
var functionPartido = require("./funciones/partido.js");

describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función horaVaciaTest", function () {
      it("Se verifica que la hora no sea nula : assert.equal(value) ", function () {
        result = functionPartido.horaVaciaTest(null);
        assert.equal(result, "La hora seleccionada no es válida");
      });
    });
});

describe("Testeo del componente Partido: ", function () {
  describe("Revisión a la función horaTest", function () {
    it("Se verifica que la hora este en el rango de 09:00 a 19:00 assert.equal(value) ", function () {
      result = functionPartido.horaTest("08:00");
      assert.equal(result, "La hora debe estar entre las 09:00 y 19:00");
    });
  });
});

//CUANDO LOS CASOS DE PRUEBA NO SE CUMPLEN

describe("Testeo del componente Partido: ", function () {
  describe("Revisión a la función horaVaciaTest", function () {
    it("Se verifica que la hora no sea nula : assert.equal(value) ", function () {
      result = functionPartido.horaVaciaTest("00:00");
      assert.equal(result, "La hora seleccionada no es válida");
    });
  });
});

describe("Testeo del componente Partido: ", function () {
describe("Revisión a la función horaTest", function () {
  it("Se verifica que la hora este en el rango de 09:00 a 19:00 assert.equal(value) ", function () {
    result = functionPartido.horaTest("09:30");
    assert.equal(result, "La hora debe estar entre las 09:00 y 19:00");
  });
});
});