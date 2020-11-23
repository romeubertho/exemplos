const { orderCalculation } = require("./functions");

// Casos de Sucesso

if (orderCalculation({ products: [{ price: 200, quantity: 10 }] }) !== 200) {
  throw new Error("Happy path simples, um produto sem desconto");
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    coupon: "default",
  }) !== 195
) {
  throw new Error("Happy path, um produto com desconto default de 5");
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    coupon: "default",
  }) !== 185
) {
  throw new Error(
    "Happy path, um produto com desconto default de 5 e de quantidade"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    coupon: "blackFriday",
  }) !== 150
) {
  throw new Error("Happy path simples, um produto com cupom de blackFriday");
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    coupon: "blackFriday",
  }) !== 140
) {
  throw new Error(
    "Happy path, um produto com cupom de blackFriday e de quantidade"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    coupon: "crazyMonday",
  }) !== 190
) {
  throw new Error("Happy path, um produto com cupom de crazyMonday");
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    coupon: "crazyMonday",
  }) !== 180
) {
  throw new Error(
    "Happy path, um produto com cupom de crazyMonday e de quantidade"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    coupon: "inverseCoupon",
  }) !== 220
) {
  throw new Error("Happy path, um produto com cupom de inverseCoupon");
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    coupon: "inverseCoupon",
  }) !== 210
) {
  throw new Error(
    "Happy path, um produto com cupom de inverseCoupon e desconto de quantidade"
  );
}

if (orderCalculation({ products: [{ price: 200, quantity: 100 }] }) !== 190) {
  throw new Error("Happy path simples, um produto com desconto de quantidade");
}

// new success test case
if (orderCalculation({ products: [{ price: 200, quantity: 99 }] }) !== 200) {
  throw new Error("Happy path, um produto sem desconto de quantidade");
}

if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    shippingType: "overseas",
  }) !== 300
) {
  throw new Error("Happy path simples, um produto com acrescimo de shipping");
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    shippingType: "overseas",
    coupon: "default",
  }) !== 295
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping e cupom de desconto default"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    shippingType: "overseas",
    coupon: "default",
  }) !== 285
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping, cupom de desconto default e desconto de quantidade"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    shippingType: "overseas",
    coupon: "blackFriday",
  }) !== 250
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping e cupom de desconto blackFriday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    shippingType: "overseas",
    coupon: "blackFriday",
  }) !== 240
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping, cupom de desconto blackFriday e desconto de quantidade"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    shippingType: "overseas",
    coupon: "crazyMonday",
  }) !== 290
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping e cupom de desconto crazyMonday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    shippingType: "overseas",
    coupon: "crazyMonday",
  }) !== 280
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping, cupom de desconto crazyMonday e desconto de quantidade"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 10 }],
    shippingType: "overseas",
    coupon: "inverseCoupon",
  }) !== 320
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping e cupom de inverseCoupon"
  );
}

// new success test case
if (
  orderCalculation({
    products: [{ price: 200, quantity: 100 }],
    shippingType: "overseas",
    coupon: "inverseCoupon",
  }) !== 310
) {
  throw new Error(
    "Happy path, um produto com acrescimo de shipping, cupom de inverseCoupon e desconto de quantidade"
  );
}

if (
  orderCalculation({
    products: [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    shippingType: "overseas",
  }) !== 1100
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    shippingType: "overseas",
    coupon: "default,",
  }) !== 1095
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior e cupon de desconto default"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    shippingType: "overseas",
    coupon: "blackFriday",
  }) !== 1050
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior e cupon de desconto blackFriday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    shippingType: "overseas",
    coupon: "crazyMonday",
  }) !== 1090
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior e cupon de desconto crazyMonday"
  );
}
// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
      { price: 200, quantity: 10 },
    ],
    shippingType: "overseas",
    coupon: "inverseCoupon",
  }) !== 1120
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior e cupon de inverseCoupon"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
    ],
    shippingType: "overseas",
  }) !== 1060
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior e desconto de quantidade em todos eles"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
    ],
    shippingType: "overseas",
    coupon: "default",
  }) !== 1055
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior, desconto de quantidade em todos eles e cupom de desconto default"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
    ],
    shippingType: "overseas",
    coupon: "blackFriday",
  }) !== 1010
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior, desconto de quantidade em todos eles e cupom de desconto blacFriday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
    ],
    shippingType: "overseas",
    coupon: "crazyMonday",
  }) !== 1050
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior, desconto de quantidade em todos eles e cupom de desconto crazyMonday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
      { price: 200, quantity: 100 },
    ],
    shippingType: "overseas",
    coupon: "inverseCoupon",
  }) !== 1080
) {
  throw new Error(
    "Happy path simples, 4 produtos com acrescimo de shipping maior, desconto de quantidade em todos eles e cupom de inverseCoupon"
  );
}

if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
  }) !== 1690
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
    shippingType: "overseas",
  }) !== 1790
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles e acrescimo de shipping"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
    shippingType: "overseas",
    coupon: "default",
  }) !== 1785
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles, acrescimo de shipping e cupom de desconto default"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
    shippingType: "overseas",
    coupon: "blackFriday",
  }) !== 1740
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles, acrescimo de shipping e cupom de desconto blackFriday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
    shippingType: "overseas",
    coupon: "crazyMonday",
  }) !== 1780
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles, acrescimo de shipping e cupom de desconto crazyMonday"
  );
}

// new success test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 100 },
      { price: 1500, quantity: 1 },
    ],
    shippingType: "overseas",
    coupon: "inverseCoupon",
  }) !== 1810
) {
  throw new Error(
    "Happy path, dois produto com desconto de quantidade em um deles, acrescimo de shipping e cupom de inverseCoupon"
  );
}

// Casos de erros

try {
  orderCalculation({ products: [null, { price: 1500, quantity: 1 }] });

  throw new Error("Wrong path, primeiro objeto sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, primeiro objeto sendo null");
  }
}

// new error test case
try {
  orderCalculation({
    products: [{ price: 200, quantity: 1 }, null, { price: 1500, quantity: 1 }],
  });

  throw new Error("Wrong path, qualquer objeto sendo null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, qualquer objeto sendo null");
  }
}

// new error test case
try {
  orderCalculation({ products: [null] });

  throw new Error("Wrong path, apenas um objeto sendo ele null");
} catch (e) {
  if (e.message !== "Cannot read property 'price' of null") {
    throw new Error("Wrong path, apenas um objeto sendo ele null");
  }
}

// new error test case
try {
  orderCalculation({});

  throw new Error("Wrong path, nenhum produto é passado como parametro");
} catch (e) {
  if (e.message !== "Cannot read property 'reduce' of undefined") {
    throw new Error("Wrong path, nenhum produto é passado como parametro");
  }
}

if (
  !Number.isNaN(
    orderCalculation({
      products: [
        { value: 1234, quantity: 12 },
        { price: 1500, quantity: 1 },
      ],
    })
  )
) {
  throw new Error("Wrong path, primeiro objeto não tendo campo price");
}

// new error test case
if (
  Number.isInteger(
    orderCalculation({
      products: [
        { price: "1234", quantity: 1 },
        { price: 1500, quantity: 1 },
      ],
    })
  )
) {
  throw new Error(
    "Wrong path, primeiro objeto tendo campo price como string resulta em string"
  );
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 1200, amount: 100 },
      { price: 1200, quantity: 1 },
    ],
  }) !== 2400
) {
  throw new Error("Wrong path, primeiro objeto não tendo campo quantity entao o desconto de quantidade não é aplicado");
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 1200, quantity: 'one hundred' },
      { price: 1200, quantity: 1 },
    ],
  }) !== 2400
) {
  throw new Error("Wrong path, primeiro objeto tendo campo quantity como string entao o desconto de quantidade não é aplicado");
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 1200, quantity: 1 },
      { price: 1200, quantity: 1 },
    ],
    shippingType: 'overseas with typo'
  }) !== 2400
) {
  throw new Error("Wrong path, campo shippingType com typo entao o preço do envio não é aplicado");
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 200, quantity: 1 },
      { price: 200, quantity: 1 },
      { price: 200, quantity: 1 },
      { price: 200, quantity: 1 },
    ],
    shippingType: 'overseas with typo'
  }) !== 800
) {
  throw new Error("Wrong path, 4 produtos com campo shippingType com typo entao o preço do envio não é aplicado");
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 205, quantity: 1 },
    ],
    coupon: 'blackFriday with typo'
  }) !== 200
) {
  throw new Error("Wrong path, campo coupon com typo entao é aplicado o coupon default");
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 205, quantity: 1 },
    ],
    coupon: 'crazyMonday with typo'
  }) !== 200
) {
  throw new Error("Wrong path, campo coupon com typo entao é aplicado o coupon default");
}

// new error test case
if (
  orderCalculation({
    products: [
      { price: 205, quantity: 1 },
    ],
    coupon: 'inverseCoupon with typo'
  }) !== 200
) {
  throw new Error("Wrong path, campo coupon com typo entao é aplicado o coupon default");
}
