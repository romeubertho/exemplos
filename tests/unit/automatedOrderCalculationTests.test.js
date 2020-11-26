const { expect, describe, test } = require("@jest/globals");
const { orderCalculation } = require("../../functions");

describe("orderCalculation Happy Paths", () => {
  test("One product without discount", () => {
    const orderValue = orderCalculation([{ price: 200, quantity: 10 }]);
    expect(orderValue).toBe(200);
  });
  test("Two products with quantity discount in one of them", () => {
    const orderValue = orderCalculation([
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ]);
    expect(orderValue).toBe(1690);
  });
  test("Many products with shipping pricing", () => {
    const orderValue = orderCalculation(
      [
        { price: 200, quantity: 10 },
        { price: 200, quantity: 10 },
        { price: 200, quantity: 10 },
        { price: 200, quantity: 10 },
      ],
      "overseas"
    );
    expect(orderValue).toBe(1100);
  });
});

describe("orderCalculation Wrong Paths", () => {
  test("Pass product being null should cause an error", () => {
    const expectedError = new Error("Cannot read property 'price' of null");
    expect(() =>
      orderCalculation([null, { price: 1500, quantity: 1 }])
    ).toThrowError(expectedError);
  });
  test("Pass product without 'price' field returns NaN", () => {
    const expectedNaN = orderCalculation([
      { value: 1234, quantity: 12 },
      { price: 1500, quantity: 1 },
    ]);
    expect(expectedNaN).toBeNaN();
  });
});
