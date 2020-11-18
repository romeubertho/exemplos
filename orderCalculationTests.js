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
      { price: 200, quantity: 2 },
      { price: 300, quantity: 1 },
    ],
    null,
    "blackFriday"
  ) !== 450
) {
  throw new Error(
    "NOVO TESTE: Happy path, dois produtos com desconto de cupon Black Friday"
  );
}

if (
  orderCalculation(
    [
      { price: 200, quantity: 2 },
      { price: 300, quantity: 1 },
    ],
    null,
    "inverseCoupon"
  ) !== 520
) {
  throw new Error(
    "NOVO TESTE: Happy path, dois produtos com acréscimo de valor por cupon inverso"
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

try {
  orderCalculation(
    [
      { price: 200, quantity: 2 },
      { price: 300, quantity: 1 },
    ],
    null,
    "invalidCoupon"
  );

  throw new Error("NOVO TESTE: Wrong path, cupom invalido");
} catch (e) {
  if (e.message !== "Cupom inválido") {
    throw new Error("NOVO TESTE: Wrong path, cupom invalido");
  }
}

try {
  orderCalculation({ price: 1400, quantity: 2 });

  throw new Error("NOVO TESTE: Wrong path, produto fora de um array");
} catch (e) {
  if (e.message !== "products.reduce is not a function") {
    throw new Error("NOVO TESTE: Wrong path, produto fora de um array");
  }
}
