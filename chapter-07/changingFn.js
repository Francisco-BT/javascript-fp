const binaryOp2 = (op) => new Function("x", "y", `return x ${op} y;`);

const binaryLeftOp = (x, op) => (y) => binaryOp2(op)(x, y);

const binaryOpRight = (op, y) => (x) => binaryOp2(op)(x, y);

const isNegative1 = binaryLeftOp(0, ">");

const isNegative2 = binaryOpRight("<", 0);

const isNegative3 = (x) => x < 0;

const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args, (err, data) => (err ? reject(err) : resolve(data)))
    );

const getField = (attr) => (obj) => obj[attr];

const demethodize1 =
  (fn) =>
  (arg0, ...args) =>
    fn.apply(arg0, args);

const demethodize2 =
  (fn) =>
  (arg0, ...args) =>
    fn.call(arg0, ...args);

const demethodize3 =
  (fn) =>
  (...args) =>
    fn.bind(...args)();

const findOptimum = (arr) => Math.max(...arr);

const findOptimum2 = (fn) => (arr) => arr.reduce(fn);

const findMaximum = findOptimum2((x, y) => (x > y ? x : y));

const findMinimum = findOptimum2((x, y) => (x < y ? x : y));

const compareHeroes = (card1, card2) => {
  const oneIfBigger = (x, y) => (x > y ? 1 : 0);

  const wins1 =
    oneIfBigger(card1.strength, card2.strength) +
    oneIfBigger(card1.powers, card2.powers) +
    oneIfBigger(card1.tech, card2.tech);

  const wins2 =
    oneIfBigger(card2.strength, card1.strength) +
    oneIfBigger(card2.powers, card1.powers) +
    oneIfBigger(card2.tech, card1.tech);

  return wins1 > wins2 ? card1 : card2;
};

function Hero(n, s, p, t) {
  this.name = n;
  this.strength = s;
  this.powers = p;
  this.tech = t;
}

const findBestHero = findOptimum2(compareHeroes);

module.exports = {
  binaryLeftOp,
  binaryOpRight,
  binaryOp2,
  isNegative1,
  isNegative2,
  isNegative3,
  promisify,
  getField,
  demethodize1,
  demethodize2,
  demethodize3,
  findOptimum,
  findOptimum2,
  findMaximum,
  findMinimum,
  compareHeroes,
  Hero,
  findBestHero,
};
