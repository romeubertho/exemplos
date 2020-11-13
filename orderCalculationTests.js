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
  orderCalculation([{ price: 200, quantity: 10 }], "land", "blackFriday") !==
  150
) {
  throw new Error("NOVO TESTE: Happy path simples, um produto com cupon");
}

if (orderCalculation([{ price: 200, quantity: 100 }], "overseas") !== 290) {
  throw new Error(
    "NOVO TESTE: Happy path, produto com desconto de quantidade e acrescimo de shipping "
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
  orderCalculation([{ price: 1500, quantity: 1 }], "land", "anyInvalidCoupon");

  throw new Error("NOVO TESTE: Wrong path, cupon inválido");
} catch (e) {
  if (e.message !== "Invalid value for 'cupon'") {
    throw new Error("NOVO TESTE: Wrong path, cupon inválido");
  }
}

try {
  orderCalculation([{ price: 1500, quantity: 1 }], "airline");

  throw new Error("NOVO TESTE: Wrong path, shipping com valor indisponível");
} catch (e) {
  if (e.message !== "Invalid value for 'shippingType'") {
    throw new Error("NOVO TESTE: Wrong path, shipping com valor indisponível");
  }
}

try {
  orderCalculation([{ price: -1500, quantity: 1 }]);

  throw new Error("NOVO TESTE: Wrong path, produto com preço negativo");
} catch (e) {
  if (e.message !== "Invalid negative value for 'price'") {
    throw new Error("NOVO TESTE: Wrong path, produto com preço negativo");
  }
}

try {
  orderCalculation([{ price: 1500, quantity: -1 }]);

  throw new Error("NOVO TESTE: Wrong path, produto com quantidade negativa");
} catch (e) {
  if (e.message !== "Invalid negative value for 'quantity'") {
    throw new Error("NOVO TESTE: Wrong path, produto com quantidade negativa");
  }
}
