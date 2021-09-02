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

// describe("Testeo del componente Partido: ", function () {
//   describe("Revisión a la función horaTest", function () {
//     it("Se verifica que la hora este en el rango de 09:00 a 19:00 assert.equal(value) ", function () {
//       result = functionPartido.horaTest("08:00");
//       assert.equal(result, "La hora debe estar entre las 09:00 y 19:00");
//     });
//   });
// });