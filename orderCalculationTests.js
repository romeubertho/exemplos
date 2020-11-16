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
  orderCalculation([
    { price: 200, quantity: 100 },
    { price: 1500, quantity: 1 },
  ]) !== 1690
) {
  throw new Error(
    "NOVO TESTE: Happy path, dois produto com desconto de quantidade em um deles"
  );
}

if (
  orderCalculation([
    { price: 200, quantity: 100 },
    { price: 1500, quantity: 1 },
  ]) !== 1690
) {
  throw new Error(
    "NOVO TESTE: Happy path, dois produto com desconto de quantidade em um deles"
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
  orderCalculation(null);

  throw new Error("NOVO TESTE: Wrong path, array sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'reduce' of null") {
    throw new Error("NOVO TESTE: Wrong path, array sendo null");
  }
}

try {
  orderCalculation({ price: 1500, quantity: 1 });

  throw new Error("NOVO TESTE: Wrong path, array sendo objeto");
} catch (e) {
  if (e.message !== "products.reduce is not a function") {
    throw new Error("NOVO TESTE: Wrong path, array sendo objeto");
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
