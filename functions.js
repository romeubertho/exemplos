const couponPriceMap = {
  blackFriday: -50,
  crazyMonday: -10,
  inverseCoupon: 20,
};

const defaultDiscount = -5;

const findCouponDiscount = (coupon) =>
  couponPriceMap[coupon] || defaultDiscount;

const orderCalculation = (products, shippingType = "land", coupon) => {
  const extraCosts = [];
  const productsTotal = products.reduce(
    (acc, currentProduct) => acc + currentProduct.price,
    0
  );

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
    extraCosts.push(products.length >= 4 ? 300 : 100);
  }

  const totalCosts = extraCosts.reduce(
    (acc, extraCosts) => acc + extraCosts,
    productsTotal
  );

  return totalCosts;
};

const calculateOrderCancel = (products, purchaseDayCount, usedCoupon) => {
  let pricePenalty = 0;

  if (products.length > 4) {
    pricePenalty += (products.length - 4) * 20;
  }

  products.forEach((product) => {
    if (purchaseDayCount > 30) {
      pricePenalty += product.price * 0.6;
    } else {
      pricePenalty += product.price * 0.2;
    }
  });

  if (pricePenalty < 50) {
    pricePenalty = 50;
  }

  return pricePenalty;
};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
