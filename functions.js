const couponPriceMap = {
  blackFriday: -50,
  crazyMonday: -10,
  inverseCoupon: 20,
};

const couponsValidForDefaultDiscount = ["defaultDiscount"];
const defaultDiscount = -5;

const checkIfCouponIsValidForDefaultDiscount = (coupon) =>
  couponsValidForDefaultDiscount.some(
    (validCoupon) => coupon === validCoupon
  ) && defaultDiscount;

const findCouponDiscount = (coupon) =>
  couponPriceMap[coupon] || checkIfCouponIsValidForDefaultDiscount(coupon);

const getCouponDiscount = (coupon) => {
  if (!coupon) {
    return 0;
  }

  const discount = findCouponDiscount(coupon);
  if (!discount) {
    throw new Error("Invalid value for 'cupon'");
  }

  return discount;
};

const shippingTypes = ["land", "overseas"];

const isValidShippingType = (shippingType) =>
  shippingTypes.some((validShippingType) => validShippingType === shippingType);

const sumProductsPrices = (products) =>
  products.reduce((acc, currentProduct) => {
    if (currentProduct.price < 0) {
      throw new Error("Invalid negative value for 'price'");
    }
    return acc + currentProduct.price;
  }, 0);

const getProductsQuantityDiscount = (products) =>
  products.reduce((acc, currentProduct) => {
    if (currentProduct.quantity < 0) {
      throw new Error("Invalid negative value for 'quantity'");
    }
    if (currentProduct.quantity >= 100) {
      return acc - 10;
    }
    return acc;
  }, 0);

const getShippingExtraCosts = (shippingType, NumberOfProducts) => {
  if (!isValidShippingType(shippingType)) {
    throw new Error("Invalid value for 'shippingType'");
  }

  if (shippingType === "overseas") {
    if (NumberOfProducts >= 4) {
      return 300;
    }
    return 100;
  }

  return 0;
};

const orderCalculation = (products, shippingType = "land", coupon) => {
  const productsTotal = sumProductsPrices(products);
  const extraCosts = [];

  const couponDiscount = getCouponDiscount(coupon);
  extraCosts.push(couponDiscount);

  const quantityDiscount = getProductsQuantityDiscount(products);
  extraCosts.push(quantityDiscount);

  const shippingDiscount = getShippingExtraCosts(shippingType, products.length);
  extraCosts.push(shippingDiscount);

  return extraCosts.reduce(
    (acc, extraCosts) => acc + extraCosts,
    productsTotal
  );
};

const MINIMUM_PURCHASE_FINE = 50;

const sumOfPurchaseFines = (purchaseFines) =>
  purchaseFines.reduce((acc, curFine) => acc + curFine, 0);

const getTotalFine = (purchaseFines) => {
  const sumFine = sumOfPurchaseFines(purchaseFines);
  return sumFine > MINIMUM_PURCHASE_FINE ? sumFine : MINIMUM_PURCHASE_FINE;
};

const getFineForEachProduct = (products, purchaseDayCount) => {
  const finePercentage = purchaseDayCount > 30 ? 0.6 : 0.2;

  return products.reduce(
    (acc, product) => acc + product.price * finePercentage,
    0
  );
};

const getFineByNumberOfProducts = (numberOfProducts) =>
  numberOfProducts > 4 ? (numberOfProducts - 4) * 20 : 0;

const calculateOrderCancel = (products, purchaseDayCount, usedCoupon) => {
  const purchaseFines = [];

  const finesBasedOnProductPrice = getFineForEachProduct(
    products,
    purchaseDayCount
  );
  purchaseFines.push(finesBasedOnProductPrice);

  const numberOfProducts = products.length;
  const finesBaseOnǸumberOfProducts = getFineByNumberOfProducts(
    numberOfProducts
  );
  purchaseFines.push(finesBaseOnǸumberOfProducts);

  return getTotalFine(purchaseFines);
};

module.exports = {
  orderCalculation,
  calculateOrderCancel,
};
