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

const getPercentageReducer = (percentage) => (acc, currentProduct) =>
  acc + percentage * currentProduct.price;

const twentyPercentReducer = getPercentageReducer(0.2);
const sixtyPercentReducer = getPercentageReducer(0.6);

const calculateOrderCancel = (products, purchasedDayCount, usedCoupon) => {
  const manyItemsExtraFee = products.length > 4 ? products.length * 20 : 0;

  const reducer =
    purchasedDayCount > 30 ? sixtyPercentReducer : twentyPercentReducer;

  const totalCancellingFee = products.reduce(reducer, manyItemsExtraFee);

  if (Number.isNaN(totalCancellingFee)) {
    return NaN;
  }

  return totalCancellingFee > 50 ? totalCancellingFee : 50;
};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
