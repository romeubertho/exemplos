const { calculateOrderCancel } = require("./functions");

// Casos de Sucesso

if (calculateOrderCancel([{ price: 100, quantity: 1 }], 5) !== 50) {
  throw new Error(
    "Happy path simples, um único produto, 5 dias e sem desconto"
  );
}

if (
  calculateOrderCancel([{ price: 250, quantity: 1 }], 5, "anyCoupon") !== 55
) {
  throw new Error(
    "Happy path simples, um único produto, 5 dias e com desconto fornecido no ato da compra"
  );
}

if (calculateOrderCancel([{ price: 300, quantity: 1 }], 5) !== 60) {
  throw new Error(
    "Happy path simples, um único produto, 5 dias, sem desconto e valor mínimo acima de R$50"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
    ],
    5
  ) !== 120
) {
  throw new Error("Happy path simples, 5 produtos, 5 dias e sem desconto");
}

if (calculateOrderCancel([{ price: 500, quantity: 1 }], 31) !== 300) {
  throw new Error(
    "Happy path simples, um único produto, 31 dias e sem desconto"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
    ],
    31
  ) !== 720
) {
  throw new Error("Happy path simples, 10 produtos, 31 dias e sem desconto");
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
    ],
    31,
    "inverseCoupon"
  ) !== 720
) {
  throw new Error(
    "Happy path simples, 10 produtos, 31 dias e com cupom inverso"
  );
}

// Casos de erro

try {
  calculateOrderCancel(
    [
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: 100, quantity: 1 },
      { price: -100, quantity: 1 },
    ],
    31
  );
  throw new Error(
    "Wrong path, preço do produto não pode ser negativo ou igual a 0"
  );
} catch (e) {
  if (e.message !== "Invalid product price, it should be higher than 0") {
    throw new Error(
      "Wrong path, preço do produto não pode ser negativo ou igual a 0"
    );
  }
}

try {
  calculateOrderCancel({ price: 100, quantity: 1 }, 31);
  throw new Error(
    "Wrong path, argumento products sendo um objeto e não um array de objetos"
  );
} catch (e) {
  if (e.message !== "products arg should be an objetct array") {
    throw new Error(
      "Wrong path, argumento products sendo um objeto e não um array de objetos"
    );
  }
}

try {
  calculateOrderCancel([{ price: 100, quantity: 1 }]);
  throw new Error("Wrong path, argumento purchaseDayCount indefinido");
} catch (e) {
  if (e.message !== "purchaseDayCount arg cannot be undefined") {
    throw new Error("Wrong path, argumento purchaseDayCount indefinido");
  }
}
