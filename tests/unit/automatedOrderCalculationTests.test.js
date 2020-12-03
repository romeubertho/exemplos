const { expect, describe, test } = require("@jest/globals");
const { orderCalculation } = require("../../functions");
const ProductFixtures = require("../fixture/ProductFixtures");

describe("orderCalculation Happy Paths", () => {
  const { simpleProduct } = ProductFixtures;

  test("One product without discount", () => {
    const orderValue = orderCalculation([simpleProduct]);
    expect(orderValue).toBe(200);
  });

  test("Two products with quantity discount in one of them", () => {
    const { productWithOneHundredQuantity } = ProductFixtures;
    const orderValue = orderCalculation([
      productWithOneHundredQuantity,
      { ...simpleProduct, price: 1500 },
    ]);

    expect(orderValue).toBe(1690);
  });

  test("Many products with shipping pricing", () => {
    const orderValue = orderCalculation(
      [simpleProduct, simpleProduct, simpleProduct, simpleProduct],
      "overseas"
    );

    expect(orderValue).toBe(1100);
  });

  test("2 produtos com desconto de quantidade em um deles com acréscimo de shipping maior e com desconto de black friday", () => {
    const orderValue = orderCalculation(
      [
        { price: 200, quantity: 100 },
        { price: 1500, quantity: 1 },
      ],
      "overseas",
      "blackFriday"
    );

    expect(orderValue).toBe(1740);
  });

  test("1 produto sem desconto mas com cupom inverso", () => {
    const orderValue = orderCalculation(
      [simpleProduct],
      "land",
      "inverseCoupon"
    );

    expect(orderValue).toBe(220);
  });
});

describe("orderCalculation Wrong Paths", () => {
  const { simpleProduct } = ProductFixtures;

  test("Pass product being null should cause an error", () => {
    const expectedError = new Error("Cannot read property 'price' of null");

    expect(() => orderCalculation([null, simpleProduct])).toThrowError(
      expectedError
    );
  });

  test("Pass product without 'price' field returns NaN", () => {
    const { productWithoutPrice } = ProductFixtures;
    const expectedNaN = orderCalculation([productWithoutPrice, simpleProduct]);

    expect(expectedNaN).toBeNaN();
  });

  test("array sendo objeto", () => {
    const expectedError = new Error("products.reduce is not a function");

    expect(() => orderCalculation(simpleProduct)).toThrowError(expectedError);
  });

  test("array sendo null", () => {
    const expectedError = new Error("Cannot read property 'reduce' of null");

    expect(() => orderCalculation(null)).toThrowError(expectedError);
  });
});
