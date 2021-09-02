var chai = require("chai");
var assert = chai.assert;
var functionPartido = require("./funciones/partido.js");

describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función golesTest", function () {
      it("Se verifica que la cantidad de goles no sea menor a cero  : assert.equal(value, value): ", function () {
        result = functionPartido.golesTest(-1);
        assert.equal(result, "La cantidad de goles no puede ser menor a cero");
      });
    });  
     
    describe("Testeo del componente Partido: ", function () {
        describe("Revisión a la función golesTest", function () {
          it("Se verifica que la cantidad de goles sea mayor o igual a cero : assert.equal(obtenido, esperado): ", function () {
            result = functionPartido.golesTest(1);
            assert.equal(result, "La cantidad de goles fue mayor o igual a cero");
          });
        });
      });
  });


  // CUANDO LOS CASOS DE PRUEBA NO SE CUMPLEN

  describe("Testeo del componente Partido: ", function () {
    describe("Revisión a la función golesTest", function () {
      it("Se verifica que la cantidad de goles no sea menor a cero  : assert.equal(value, value): ", function () {
        result = functionPartido.golesTest(0);
        assert.equal(result, "La cantidad de goles no puede ser menor a cero");
      });
    }); 

    describe("Testeo del componente Partido: ", function () {
        describe("Revisión a la función golesTest", function () {
          it("Se verifica que la cantidad de goles sea mayor o igual a cero : assert.equal(obtenido, esperado): ", function () {
            result = functionPartido.golesTest(-2);
            assert.equal(result, "La cantidad de goles fue mayor o igual a cero");
          });
        });
      });
  });

