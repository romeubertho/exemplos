const UserControllerUtils = require("../../../src/Utils/Controller/UserControllerUtils");
const { expect } = require("chai");
const UserFixtures = require("../../fixtures/UserFixtures");

suite("UserControllerUtils", () => {
  const { defaultRequestBody } = UserFixtures;

  test("if validateCreateUserBody receives a body with all values not null, it works correctly", () => {
    const validationInfo = UserControllerUtils.validateCreateUserBody(
      defaultRequestBody
    );

    expect(validationInfo).to.deep.equal({
      containErrors: false,
      fieldsWithErrors: [],
    });
  });
});
