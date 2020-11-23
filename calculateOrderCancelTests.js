const { calculateOrderCancel } = require("./functions");

// success case
if (calculateOrderCancel({ products: [{ price: 10, quantity: 10 }] }) !== 50) {
  throw new Error("Happy path, multa minima de uma compra sem qualquer desconto");
}

if (calculateOrderCancel({ products: [{ price: 10, quantity: 100 }] }) !== 50) {
  throw new Error("Happy path, multa minima de uma compra sem cupom desconto e com desconto de quantidade");
}

if (calculateOrderCancel({ products: [{ price: 10, quantity: 10 }], usedCoupon: 'default' }) !== 50) {
  throw new Error(
    "Happy path, multa minima de uma compra com desconto default"
  );
}

if (
  calculateOrderCancel({ products: [{ price: 1000, quantity: 10 }] }) !== 200
) {
  throw new Error("Happy path, multa de uma compra sem qualquer desconto");
}

if (
  calculateOrderCancel({ products: [{ price: 1000, quantity: 100 }] }) !== 198
) {
  throw new Error("Happy path, multa de uma compra com desconto de quantidade");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    purchaseDayCount: 31,
  }) !== 600
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias sem desconto"
  );
}


if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    purchaseDayCount: 31,
  }) !== 594
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto de quantidade"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "default",
  }) !== 199
) {
  throw new Error("Happy path, multa de uma compra com desconto de cupom default");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "default",
  }) !== 197
) {
  throw new Error("Happy path, multa de uma compra com desconto de cupom default e de quantidade");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "default",
    purchaseDayCount: 31,
  }) !== 597
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto default"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "default",
    purchaseDayCount: 31,
  }) !== 591
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto de cupom default e de quantidade"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "blackFriday",
  }) !== 190
) {
  throw new Error("Happy path, multa de uma compra com desconto blackFriday");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "blackFriday",
  }) !== 188
) {
  throw new Error("Happy path, multa de uma compra com desconto de blackFriday e de quantidade");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "blackFriday",
    purchaseDayCount: 31,
  }) !== 570
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto de blackFriday"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "blackFriday",
    purchaseDayCount: 31,
  }) !== 564
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto de blackFriday e de quantidade"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "crazyMonday",
  }) !== 198
) {
  throw new Error("Happy path, multa de uma compra com desconto de crazyMonday");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "crazyMonday",
  }) !== 196
) {
  throw new Error("Happy path, multa de uma compra com desconto de crazyMonday e de quantidade");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "crazyMonday",
    purchaseDayCount: 31,
  }) !== 594
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto crazyMonday"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "crazyMonday",
    purchaseDayCount: 31,
  }) !== 588
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto de crazyMonday e de quantidade"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "inverseCoupon",
  }) !== 204
) {
  throw new Error("Happy path, multa de uma compra com desconto de inverseCoupon");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "inverseCoupon",
  }) !== 202
) {
  throw new Error("Happy path, multa de uma compra com desconto de inverseCoupon e de quantidade");
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 10 }],
    usedCoupon: "inverseCoupon",
    purchaseDayCount: 31,
  }) !== 612
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto inverseCoupon"
  );
}

if (
  calculateOrderCancel({
    products: [{ price: 1000, quantity: 100 }],
    usedCoupon: "inverseCoupon",
    purchaseDayCount: 31,
  }) !== 606
) {
  throw new Error(
    "Happy path, multa de uma compra feita há mais de 30 dias com desconto de inverseCoupon e de quantidade"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
  }) !== 1000
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos sem desconto"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    purchaseDayCount: 31,
  }) !== 3000
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos feita há mais de 30 dias sem desconto"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "default",
  }) !== 999
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos com desconto default"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "default",
    purchaseDayCount: 31,
  }) !== 2997
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos feita há mais de 30 dias com desconto default"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "blackFriday",
  }) !== 990
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos com desconto blackFriday"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "blackFriday",
    purchaseDayCount: 31,
  }) !== 2970
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos feita há mais de 30 dias com desconto blackFriday"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "crazyMonday",
  }) !== 998
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos com desconto crazyMonday"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "crazyMonday",
    purchaseDayCount: 31,
  }) !== 2994
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos feita há mais de 30 dias com desconto crazyMonday"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "inverseCoupon",
  }) !== 1004
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos com desconto inverseCoupon"
  );
}

if (
  calculateOrderCancel({
    products: [
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
      { price: 1000, quantity: 10 },
    ],
    usedCoupon: "inverseCoupon",
    purchaseDayCount: 31,
  }) !== 3012
) {
  throw new Error(
    "Happy path, multa de uma compra de mais de 4 produtos feita há mais de 30 dias com desconto inverseCoupon"
  );
}


// error cases
try {
  calculateOrderCancel({ products: [null, { price: 1500, quantity: 1 }] });

  throw new Error("Wrong path, primeiro objeto sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'quantity' of null") {
    throw new Error("Wrong path, primeiro objeto sendo null");
  }
}

try {
  calculateOrderCancel({ products: [{ price: 1500, quantity: 1 }], purchaseDayCount: -1 });
} catch (e) {
  if (e.message !== "purchaseDayCount should be a positive number to calculate the assessment") {
    throw new Error(`Wrong path, ${e.message}`);
  }
}

if (calculateOrderCancel({ products: [{ price: 10, quantity: 10 }], purchaseDayCount: 0 }) !== 0) {
  throw new Error("Wrong path, resultado deve ser zero");
}