const { expect, describe, test } = require("@jest/globals");
const { orderCalculation } = require("../../functions");
const ProductFixtures = require("../fixture/ProductFixtures");

describe("orderCalculation Happy Paths", () => {
  const { simpleProduct, productWithOneHundredQuantity } = ProductFixtures;

  test("One product without discount", () => {
    const orderValue = orderCalculation([simpleProduct]);
    expect(orderValue).toBe(200);
  });

  test("Two products with quantity discount in one of them", () => {
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

  // new happy path tests

  test("NEW HAPPY PATH TEST:One product with quantity discount", () => {
    const orderValue = orderCalculation([productWithOneHundredQuantity]);
    expect(orderValue).toBe(190);
  });

  test("NEW HAPPY PATH TEST: One product with shipping pricing", () => {
    const orderValue = orderCalculation([simpleProduct], "overseas");
    expect(orderValue).toBe(300);
  });

  test("NEW HAPPY PATH TEST: One product with coupon discount", () => {
    const orderValue = orderCalculation([simpleProduct], "land", "blackFriday");
    expect(orderValue).toBe(150);
  });

  test("NEW HAPPY PATH TEST: One product with quantity discount and shipping pricing", () => {
    const orderValue = orderCalculation(
      [productWithOneHundredQuantity],
      "overseas"
    );
    expect(orderValue).toBe(290);
  });

  test("NEW HAPPY PATH TEST: One product with quantity and coupon discount", () => {
    const orderValue = orderCalculation(
      [productWithOneHundredQuantity],
      "land",
      "blackFriday"
    );
    expect(orderValue).toBe(140);
  });

  test("NEW HAPPY PATH TEST: One product with coupon discount and shipping pricing", () => {
    const orderValue = orderCalculation(
      [simpleProduct],
      "overseas",
      "blackFriday"
    );
    expect(orderValue).toBe(250);
  });

  test("NEW HAPPY PATH TEST: One product with quantity and coupon discount and shipping pricing", () => {
    const orderValue = orderCalculation(
      [productWithOneHundredQuantity],
      "overseas",
      "blackFriday"
    );
    expect(orderValue).toBe(240);
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

  // new wrong path tests
  test("NEW WRONG PATH TEST: Invalid Coupon", () => {
    const expectedError = new Error("Invalid value for 'coupon'");
    expect(() =>
      orderCalculation([simpleProduct], "land", "anyInvalidCoupon")
    ).toThrowError(expectedError);
  });

  test("NEW WRONG PATH TEST: Invalid Coupon", () => {
    const expectedError = new Error("Invalid value for 'coupon'");
    expect(() =>
      orderCalculation([simpleProduct], "land", "anyInvalidCoupon")
    ).toThrowError(expectedError);
  });

  test("NEW WRONG PATH TEST: Invalid Shipping", () => {
    const expectedError = new Error("Invalid value for 'shippingType'");
    expect(() => orderCalculation([simpleProduct], "airline")).toThrowError(
      expectedError
    );
  });

  test("NEW WRONG PATH TEST: Pass product with negative value for 'price' field", () => {
    const { productWithNegativePricing } = ProductFixtures;
    const expectedError = new Error("Invalid value for 'price'");
    expect(() => orderCalculation([productWithNegativePricing])).toThrowError(
      expectedError
    );
  });

  test("NEW WRONG PATH TEST:Pass product with negative value for 'quantity' field", () => {
    const { productWithNegativeQuantity } = ProductFixtures;
    const expectedError = new Error("Invalid value for 'quantity'");
    expect(() => orderCalculation([productWithNegativeQuantity])).toThrowError(
      expectedError
    );
  });
});
