const couponPriceMap = {
  blackFriday: -50,
  crazyMonday: -10,
  inverseCoupon: 20,
};

const defaultDiscount = -5;

const findCouponDiscount = (coupon) =>
  couponPriceMap[coupon] || defaultDiscount;

const orderCalculation = ({ products, shippingType = "land", coupon }) => {
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

const calculateOrderCancel = ({ products, purchaseDayCount = 1, usedCoupon }) => {
  if (purchaseDayCount < 0) {
    throw new Error('purchaseDayCount should be a positive number to calculate the assessment'); 
  }
  
  if (purchaseDayCount === 0) {
    return 0;
  }

  const revertDiscount = usedCoupon ? findCouponDiscount(usedCoupon) : 0;
  const revertDiscountPerProduct = revertDiscount / products.length;
  const reducer = (acc, current, index) => {
    const revertQuantityDiscount = current.quantity >= 100 ? 10 : 0;
    const realPrice = current.price + revertDiscountPerProduct - revertQuantityDiscount;
    const assessmentPartial = purchaseDayCount > 30
      ? 0.6 * realPrice
      : 0.2 * realPrice;
    const cancelMoreFourProducts = index > 4 ? 20 : 0;

    return acc + assessmentPartial + cancelMoreFourProducts;
  };
  
  const assessment = products.reduce(reducer, 0);

  return assessment > 50 ? Math.round(assessment * 100) / 100 : 50;
};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
