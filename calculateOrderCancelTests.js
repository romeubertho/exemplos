const { calculateOrderCancel } = require("./functions");

// Casos de Sucesso

if (calculateOrderCancel([{ price: 200, quantity: 10 }]) !== 50) {
  throw new Error(
    "Happy path simples, cancelamento de um produto com multa mínima de 50"
  );
}

if (calculateOrderCancel([{ price: 600, quantity: 10 }]) !== 120) {
  throw new Error(
    "Happy path simples, cancelamento de um produto com multa de 20%"
  );
}

if (calculateOrderCancel([{ price: 600, quantity: 10 }], 31) !== 360) {
  throw new Error(
    "Happy path simples, cancelamento de um produto com multa de 60%"
  );
}

if (
  calculateOrderCancel([
    { price: 20, quantity: 10 },
    { price: 20, quantity: 10 },
    { price: 20, quantity: 10 },
    { price: 20, quantity: 10 },
    { price: 20, quantity: 10 },
  ]) !== 120
) {
  throw new Error(
    "Happy path simples, cancelamento de mais de 4 produtos com multa de 20%"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 10, quantity: 10 },
      { price: 10, quantity: 10 },
      { price: 10, quantity: 10 },
      { price: 10, quantity: 10 },
      { price: 10, quantity: 10 },
    ],
    31
  ) !== 130
) {
  throw new Error(
    "Happy path simples, cancelamento de mais de 4 produtos com multa de 60%"
  );
}

// Casos de erros

try {
  calculateOrderCancel([null, { price: 1500, quantity: 1 }]);

  throw new Error("Wrong path, primeiro objeto sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, primeiro objeto sendo null");
  }
}

try {
  calculateOrderCancel();

  throw new Error("Wrong path, primeiro parâmetro sendo undefined");
} catch (e) {
  if (e.message !== "Cannot read property 'length' of undefined") {
    throw new Error("Wrong path, primeiro parâmetro sendo undefined");
  }
}

if (
  typeof calculateOrderCancel([{ price: "duzentos" }, { price: 100 }]) ===
  "Number"
) {
  throw new Error("Wrong path, price não é Number");
}

if (
  !Number.isNaN(
    calculateOrderCancel([
      { value: 1234, quantity: 12 },
      { price: 1500, quantity: 1 },
    ])
  )
) {
  throw new Error("Wrong path, primeiro objeto não tendo campo price");
}
