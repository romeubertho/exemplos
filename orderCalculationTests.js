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

// Casos de Sucesso Romeu
if (
  orderCalculation(
    [{ price: 200, quantity: 100 }],
    "overseas",
    "inverseCoupon"
  ) != 310
) {
  throw new Error(
    "NOVO TESTE Happy path simples, um produto com acrescimo de shipping, cupom inverso e com desconto de quantidade"
  );
}

if (
  orderCalculation(
    [
      { price: 100, quantity: 10 },
      { price: 110, quantity: 100 },
    ],
    "overseas",
    "whatever"
  ) != 295
) {
  throw new Error(
    "NOVO TESTE Happy path simples, dois produtos com apenas um desconto por quantidade, acrescimo de shipping, cupom padrão"
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

// Casos de erros Romeu

try {
  orderCalculation({ price: 500, quantity: 1 });
  throw new Error(
    "NOVO TESTE Wrong path, argumento products sendo um objeto e não um array de objetos"
  );
} catch (e) {
  if (e.message !== "products.reduce is not a function") {
    throw new Error(
      "NOVO TESTE Wrong path, argumento products sendo um objeto e não um array de objetos"
    );
  }
}

try {
  orderCalculation([{ price: 5, quantity: 1 }], "land", "blackFriday");
  throw new Error("NOVO TESTE Wrong path, valor final não pode ser negativo");
} catch (e) {
  if (e.message !== "Invalid value, total cannot be negative") {
    throw new Error("NOVO TESTE Wrong path, valor final não pode ser negativo");
  }
}

try {
  orderCalculation([{ price: -500, quantity: 1 }]);
  throw new Error(
    "NOVO TESTE Wrong path, preço do produto não pode ser negativo ou igual a 0"
  );
} catch (e) {
  if (e.message !== "Invalid product price, it should be higher than 0") {
    throw new Error(
      "NOVO TESTE Wrong path, preço do produto não pode ser negativo ou igual a 0"
    );
  }
}