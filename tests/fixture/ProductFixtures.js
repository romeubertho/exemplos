const ProductFixtures = {};

ProductFixtures.simpleProduct = { price: 200, quantity: 10 };

ProductFixtures.productWithOneHundredQuantity = { price: 200, quantity: 100 };

ProductFixtures.productWithoutPrice = { value: 1234, quantity: 12 };

ProductFixtures.productWithNegativePricing = { price: -200, quantity: 10 };

ProductFixtures.productWithNegativeQuantity = { price: 200, quantity: -10 };

module.exports = ProductFixtures;
