const { calculateOrderCancel } = require("./functions");

//Casos de Sucesso
if (calculateOrderCancel([{ price: 300, quantity: 10 }], 10) !== 60) {
  throw new Error(
    "Happy path simples, um produto com menos de 30 dias de atraso"
  );
}

if (calculateOrderCancel([{ price: 200, quantity: 10 }], 10) !== 50) {
  throw new Error(
    "Happy path simples, um produto com menos de 30 dias de atraso e com multa menor que 50"
  );
}

if (calculateOrderCancel([{ price: 200, quantity: 10 }], 31) !== 120) {
  throw new Error(
    "Happy path simples, um produto com mais de 30 dias de atraso"
  );
}

if (
  calculateOrderCancel(
    [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    10
  ) !== 280
) {
  throw new Error(
    "Happy path simples, seis produto com menos de 30 dias de atraso"
  );
}

// Casos de erros

try {
  calculateOrderCancel([null, { price: 1500, quantity: 1 }], 10);

  throw new Error("Wrong path, primeiro objeto sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, primeiro objeto sendo null");
  }
}

try {
  calculateOrderCancel({ price: 1400, quantity: 2 }, 10);

  throw new Error("Wrong path, produto fora de um array");
} catch (e) {
  if (e.message !== "products.reduce is not a function") {
    throw new Error("Wrong path, produto fora de um array");
  }
}
