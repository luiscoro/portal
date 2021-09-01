var chai = require("chai");
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var functionCedula = require("../funciones/cedula.js");

describe("Testing assert function: ", function () {
  describe("Check addTest Function", function () {
    it("Check the returned value using : assert.equal(value, value): ", function () {
      result = functionCedula.cedulaTest("2100463186");
      assert.equal(result, 1);
    });
  });
});
