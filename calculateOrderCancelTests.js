const { calculateOrderCancel } = require("./functions");

// Casos de Sucesso

if (calculateOrderCancel([{ price: 100, quantity: 10 }], 7) !== 50) {
  throw new Error(
    "Happy path simples, multa mínima pelo cancelamento de um produto"
  );
}

if (calculateOrderCancel([{ price: 1000, quantity: 10 }], 7) !== 200) {
  throw new Error("Happy path simples, multa pelo cancelamento de um produto");
}

if (calculateOrderCancel([{ price: 1000, quantity: 10 }], 31) !== 600) {
  throw new Error(
    "Happy path simples, multa pelo cancelamento de um produto com mais de 30 dias"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
    ],
    7
  ) !== 60
) {
  throw new Error(
    "Happy path simples, multa pelo cancelamento de mais de um produto"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
    ],
    7
  ) !== 160
) {
  throw new Error(
    "Happy path simples, multa pelo cancelamento de mais de quatro produtos"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
      { price: 100, quantity: 10 },
    ],
    31
  ) !== 400
) {
  throw new Error(
    "Happy path simples, multa pelo cancelamento de mais de quatro produtos em mais de 30 dias"
  );
}

// Casos de erros

// try {
//     calculateOrderCancel([null, { price: 1500, quantity: 1 }]);

//     throw new Error("Wrong path, primeiro objeto sendo null");
//   } catch (e) {
//     if (e.message !== "Cannot read property 'price' of null") {
//       throw new Error("Wrong path, primeiro objeto sendo null");
//     }
//   }
