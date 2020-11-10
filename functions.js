const couponPriceMap = {
  blackFriday: -50,
  crazyMonday: -10,
  inverseCoupon: 20,
};

const defaultDiscount = -5;

const findCouponDiscount = (coupon) =>
  couponPriceMap[coupon] || defaultDiscount;

const orderCalculation = (products, shippingType = "land", coupon) => {
  const productsTotal = products.reduce(
    (acc, currentProduct) => acc + currentProduct.price,
    0
  );
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
  return extraCosts.reduce(
    (acc, extraCosts) => acc + extraCosts,
    productsTotal
  );
};

const calculateOrderCancel = () => {};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
