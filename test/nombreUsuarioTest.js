var chai = require("chai");
var assert = chai.assert;
var functionUsuario = require("./funciones/Usuario.js");

describe("Testeo del componente Usuario: ", function () {
  describe("Revisión a la función en caso de que el nombre este vacío", function () {
    it("Se verifica que exista un nombre : assert.equal(value) ", function () {
      result = functionUsuario.nombreVacioUsuarioTest(null);
      assert.equal(result, "El nombre del usuario es obligatorio");
    });
  });
});

describe("Testeo del componente Usuario: ", function () {
  describe("Revisión a la función nombreUsuarioTest", function () {
    it("Se verifica que exista un nombre : assert.equal(value) ", function () {
      result = functionUsuario.nombreUsuarioTest("Luis Coronel");
      assert.equal(result, "El nombre del usuario fue ingresado");
    });
  });
});
