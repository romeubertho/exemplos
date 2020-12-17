const sinon = require("sinon");
const { expect } = require("chai");

const userControllerUtils = require("../../../../src/Utils/Controller/UserControllerUtils");

const UserFixtures = require("../../../fixtures/UserFixtures");

suite("UserControllerUtils", () => {
  /** @var {}  */

  suite("validateCreateUserBody", () => {
    const { defaultRequestBody } = UserFixtures;
    test("if receiving body with all info being different from empty string, validate User body request", (done) => {
      const {
        containErrors,
        fieldsWithErrors,
      } = userControllerUtils.validateCreateUserBody(defaultRequestBody);

      expect({ containErrors, fieldsWithErrors }).to.eql({
        containErrors: false,
        fieldsWithErrors: [],
      });

      done();
    });
  });
});
