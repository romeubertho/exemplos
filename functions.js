const couponPriceMap = {
  blackFriday: -50,
  crazyMonday: -10,
  inverseCoupon: 20,
};

const defaultDiscount = -5;

const findCouponDiscount = (coupon) => {
  if (!couponPriceMap[coupon]) {
    throw new Error("Cupom inválido");
  }
  return couponPriceMap[coupon] || defaultDiscount;
};

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

const calculateOrderCancel = (products, purchaseDayCount, usedCoupon) => {
  const fine = [];

  if (products.length > 4) {
    const fineProducts = products.length - 4;
    fine.push(fineProducts * 20);
  }

  fine.push(
    products.reduce(
      (acc, products) =>
        acc +
        (purchaseDayCount < 30 ? products.price * 0.2 : products.price * 0.6),
      0
    )
  );

  const fineValue = fine.reduce((acc, extraCosts) => acc + extraCosts, 0);

  return fineValue > 50 ? fineValue : 50;
};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
