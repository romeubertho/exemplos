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

const calculateOrderCancel = () => {};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
