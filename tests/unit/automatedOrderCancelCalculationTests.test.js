const { expect, describe, test } = require("@jest/globals");
const { calculateOrderCancel } = require("../../functions");
const ProductFixtures = require("../fixture/ProductFixtures");

describe("calculateOrderCancel Happy Paths", () => {
  const { productWithOneHundredPriceAndFiveQuantity } = ProductFixtures;

  test("1 produto sendo cancelado", () => {
    const orderValue = calculateOrderCancel([
      productWithOneHundredPriceAndFiveQuantity,
    ]);

    expect(orderValue).toBe(50);
  });

  test("Mais de 4 produtos diferentes sendo cancelados", () => {
    const orderValue = calculateOrderCancel([
      productWithOneHundredPriceAndFiveQuantity,
      productWithOneHundredPriceAndFiveQuantity,
      productWithOneHundredPriceAndFiveQuantity,
      productWithOneHundredPriceAndFiveQuantity,
      productWithOneHundredPriceAndFiveQuantity,
    ]);

    expect(orderValue).toBe(120);
  });

  test("2 produtos diferentes sendo cancelados com mais de 30 dias de compra", () => {
    const orderValue = calculateOrderCancel(
      [
        productWithOneHundredPriceAndFiveQuantity,
        productWithOneHundredPriceAndFiveQuantity,
      ],
      31
    );

    expect(orderValue).toBe(120);
  });

  test("Mais de 4 produtos diferentes sendo cancelados com mais de 30 dias de compra", () => {
    const orderValue = calculateOrderCancel(
      [
        productWithOneHundredPriceAndFiveQuantity,
        productWithOneHundredPriceAndFiveQuantity,
        productWithOneHundredPriceAndFiveQuantity,
        productWithOneHundredPriceAndFiveQuantity,
        productWithOneHundredPriceAndFiveQuantity,
      ],
      31
    );

    expect(orderValue).toBe(320);
  });

  test("2 produtos diferentes sendo cancelados com mais de 30 dias de compra", () => {
    const orderValue = calculateOrderCancel(
      [
        productWithOneHundredPriceAndFiveQuantity,
        productWithOneHundredPriceAndFiveQuantity,
      ],
      31,
      "blackFriday"
    );

    expect(orderValue).toBe(120);
  });
});

describe("calculateOrderCancel Wrong Paths", () => {
  const { productWithOneHundredPriceAndFiveQuantity } = ProductFixtures;

  test("objeto do array sendo null", () => {
    const expectedError = new Error("Cannot read property 'price' of null");

    expect(() =>
      calculateOrderCancel([null, { price: 10, quantity: 1 }])
    ).toThrowError(expectedError);
  });

  test("array sendo null", () => {
    const expectedError = new Error("Cannot read property 'length' of null");

    expect(() => calculateOrderCancel(null)).toThrowError(expectedError);
  });

  test("array sendo objeto", () => {
    const expectedError = new Error("products.forEach is not a function");

    expect(() =>
      calculateOrderCancel(productWithOneHundredPriceAndFiveQuantity)
    ).toThrowError(expectedError);
  });

  test("primeiro objeto não tendo campo price retornando NaN", () => {
    const expectedNaN = calculateOrderCancel([
      { value: 1234, quantity: 12 },
      { price: 1500, quantity: 1 },
    ]);

    expect(expectedNaN).toBeNaN();
  });
});
