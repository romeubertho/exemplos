const { calculateOrderCancel } = require("./functions");

// Casos de Sucesso

if (calculateOrderCancel([{ price: 100, quantity: 5 }]) !== 50) {
  throw new Error("Happy path: 1 produto sendo cancelado");
}

if (
  calculateOrderCancel([
    { price: 100, quantity: 5 },
    { price: 100, quantity: 5 },
    { price: 100, quantity: 5 },
    { price: 100, quantity: 5 },
    { price: 100, quantity: 5 },
  ]) !== 120
) {
  throw new Error("Happy path: mais de 4 produtos diferentes sendo cancelados");
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 5 },
      { price: 100, quantity: 5 },
    ],
    31
  ) !== 120
) {
  throw new Error(
    "Happy path: 2 produtos diferentes sendo cancelados com mais de 30 dias de compra"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 5 },
      { price: 100, quantity: 5 },
      { price: 100, quantity: 5 },
      { price: 100, quantity: 5 },
      { price: 100, quantity: 5 },
    ],
    31
  ) !== 320
) {
  throw new Error(
    "Happy path: mais de 4 produtos diferentes sendo cancelados com mais de 30 dias de compra"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 5 },
      { price: 100, quantity: 5 },
    ],
    31,
    "blackFriday"
  ) !== 120
) {
  throw new Error(
    "Happy path: 2 produtos diferentes sendo cancelados com mais de 30 dias de compra"
  );
}

// Casos de erros

try {
  calculateOrderCancel([null, { price: 10, quantity: 1 }]);

  throw new Error("Wrong path, objeto do array sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, objeto do array sendo null");
  }
}

try {
  calculateOrderCancel(null);

  throw new Error("Wrong path, array sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'length' of null") {
    throw new Error("Wrong path, array sendo null");
  }
}

try {
  calculateOrderCancel({ price: 1500, quantity: 1 });

  throw new Error("Wrong path, array sendo objeto");
} catch (e) {
  if (e.message !== "products.forEach is not a function") {
    throw new Error("Wrong path, array sendo objeto");
  }
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
