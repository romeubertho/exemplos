const { orderCalculation } = require("./functions");

// Casos de Sucesso

if (orderCalculation([{ price: 200, quantity: 10 }]) !== 200) {
  throw new Error("Happy path simples, um produto sem desconto");
}

if (orderCalculation([{ price: 200, quantity: 100 }]) !== 190) {
  throw new Error("Happy path simples, um produto com desconto de quantidade");
}

if (orderCalculation([{ price: 200, quantity: 10 }], "overseas") !== 300) {
  throw new Error("Happy path simples, um produto com acrescimo de shipping");
}

if (
  orderCalculation(
    [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    "overseas"
  ) !== 1100
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior"
  );
}
if (
  orderCalculation([
    { price: 200, quantity: 100 },
    { price: 1500, quantity: 1 },
  ]) !== 1690
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles"
  );
}

if (
  orderCalculation(
    [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
    "land",
    "inverseCoupon"
  ) !== 1710
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles e acréscimo de 20 do inverseCoupon"
  );
}

if (
  orderCalculation(
    [
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
    ],
    "overseas",
    "couponThatDoesNotExist"
  ) !== 1055
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior, com desconto de quantidade em todos e defaultCoupon"
  );
}

// Casos de erros

try {
  orderCalculation([null, { price: 1500, quantity: 1 }]);

  throw new Error("Wrong path, primeiro objeto sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, primeiro objeto sendo null");
  }
}

try {
  orderCalculation();

  throw new Error("Wrong path, primeiro parâmetro sendo undefined");
} catch (e) {
  if (e.message !== "Cannot read property 'reduce' of undefined") {
    throw new Error("Wrong path, primeiro parâmetro sendo undefined");
  }
}

if (
  typeof orderCalculation([{ price: "duzentos" }, { price: 100 }]) === "Number"
) {
  throw new Error("Wrong path, price não é Number");
}

if (
  !Number.isNaN(
    orderCalculation([
      { value: 1234, quantity: 12 },
      { price: 1500, quantity: 1 },
    ])
  )
) {
  throw new Error("Wrong path, primeiro objeto não tendo campo price");
}
