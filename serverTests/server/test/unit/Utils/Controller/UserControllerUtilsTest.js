const sinon = require("sinon");
const { expect } = require("chai");

const userControllerUtils = require("../../../../src/Utils/Controller/UserControllerUtils");

const UserFixtures = require("../../../fixtures/UserFixtures");

suite("UserControllerUtils", () => {
  /** @var {}  */

  suite("validateCreateUserBody", () => {
    const {
      defaultRequestBody,
      requestBodyWithoutNameField,
      requestBodyWithEmailAsEmptyString,
    } = UserFixtures;
    test("if receiving body with all fields present and being different from empty string, validate user creation body request", (done) => {
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

    test("if receiving body without one field, validate user creation body request", (done) => {
      const {
        containErrors,
        fieldsWithErrors,
      } = userControllerUtils.validateCreateUserBody(
        requestBodyWithoutNameField
      );

      expect({ containErrors, fieldsWithErrors }).to.eql({
        containErrors: true,
        fieldsWithErrors: ["name"],
      });

      done();
    });

    test("if receiving body with one field being an empty string, validate user creation body request", (done) => {
      const {
        containErrors,
        fieldsWithErrors,
      } = userControllerUtils.validateCreateUserBody(
        requestBodyWithEmailAsEmptyString
      );

      expect({ containErrors, fieldsWithErrors }).to.eql({
        containErrors: true,
        fieldsWithErrors: ["email"],
      });

      done();
    });
  });
});
