var chai = require("chai");
var assert = chai.assert;
var functionCedula = require("./funciones/Usuario.js");

describe("Testeo del componente Usuario: ", function () {
  describe("Revisión a la función cedulaUsuarioTest", function () {
    it("Se verifica que exista la cédula : assert.equal(value) ", function () {
      result = functionCedula.cedulaUsuarioTest("0604377044");
      assert.equal(result, "El número de cédula es válido");
    });
  });
});

describe("Testeo del componente Usuario: ", function () {
  describe("Revisión a la función cedulaUsuarioTest", function () {
    it("Se verifica que exista la cédula : assert.equal(value) ", function () {
      result = functionCedula.cedulaUsuarioTest("0604377045");
      assert.equal(result, "El número de cédula no es válido");
    });
  });
});
