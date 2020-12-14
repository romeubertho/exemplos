const { expect, describe, test } = require("@jest/globals");
const { orderCalculation } = require("../../functions");
const ProductFixtures = require("../fixture/ProductFixtures");

describe("orderCalculation Happy Paths", () => {
  const { simpleProduct } = ProductFixtures;
  test("One product without discount", () => {
    const orderValue = orderCalculation([simpleProduct]);
    expect(orderValue).toBe(200);
  });
});
