const couponPriceMap = {
  blackFriday: -50,
  crazyMonday: -10,
  inverseCoupon: 20,
};

const defaultDiscount = -5;

const findCouponDiscount = (coupon) =>
  couponPriceMap[coupon] || defaultDiscount;

const orderCalculation = (products, shippingType = "land", coupon) => {
  const productsTotal = products.reduce((acc, currentProduct) => {
    if (currentProduct.price <= 0) {
      throw new Error("Invalid product price, it should be higher than 0");
    }
    return acc + currentProduct.price;
  }, 0);
  const extraCosts = [];

  if (coupon) {
    const discount = findCouponDiscount(coupon);
    extraCosts.push(discount);
  }

  products.forEach((product) => {
    if (product.quantity >= 100) {
      extraCosts.push(-10);
    }
  });

  if (shippingType === "overseas") {
    let overseasShippingCost = 100;
    if (products.length >= 4) {
      overseasShippingCost = 300;
    }
    extraCosts.push(overseasShippingCost);
  }
  const costs = extraCosts.reduce(
    (acc, extraCosts) => acc + extraCosts,
    productsTotal
  );
  if (costs < 0) {
    throw new Error("Invalid value, total cannot be negative");
  }
  return costs;
};

const calculateOrderCancel = (products, purchaseDayCount, usedCoupon) => {
  
  if (!Array.isArray(products)) {
    throw new Error("products arg should be an objetct array");
  }

  if (!purchaseDayCount) {
    throw new Error("purchaseDayCount arg cannot be undefined");
  }

  const fines = [];
  const productsQty = products.length;
  const finePercentApplied = purchaseDayCount > 30 ? 0.6 : 0.2;
  const productsAdditionalFine = productsQty > 4 ? (productsQty - 4) * 20 : 0;
  const productsFineByItem = products.reduce((acc, currentProduct) => {
    if (currentProduct.price <= 0) {
      throw new Error("Invalid product price, it should be higher than 0");
    }
    return acc + currentProduct.price * finePercentApplied;
  }, 0);

  if (usedCoupon) {
    const discount = findCouponDiscount(usedCoupon);
    if (discount < 0) {
      fines.push(-discount);
    }
  }

  fines.push(productsAdditionalFine);
  fines.push(productsFineByItem);

  const fineTotal = fines.reduce((acc, fine) => acc + fine, 0);
  return fineTotal >= 50 ? fineTotal : 50;
};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
