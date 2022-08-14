const {
  someFunction,
  addLogging,
  changeSign,
  subtract,
  addTiming,
  memoize,
  onceAndAfter2,
  spanishComparison,
  invert,
} = require("./functions");
let { fib } = require("./functions");

const substractWithLogging = addLogging(subtract);
const changeSignWithLogging = addLogging(changeSign);
const throwErrorWithLogging = addLogging(() => {
  throw new Error("An error happened");
});

substractWithLogging(7, 5);
changeSignWithLogging(5);
try {
  throwErrorWithLogging();
} catch {
  // Do nothing for now
}

const subtractWithTiming = addTiming(subtract);
console.log("attemping to run");
try {
  subtractWithTiming(7, 5);
  subtractWithTiming(4, 0);
} catch (error) {
  console.error(error);
}

const testFib = (n) => fib(n);

// addTiming(testFib)(45);
// addTiming(testFib)(40);
// addTiming(testFib)(35);

const fibMemoize = memoize((n) =>
  n < 2 ? n : fibMemoize(n - 2) + fibMemoize(n - 1)
);
addTiming(fibMemoize)(45);
addTiming(fibMemoize)(45);
addTiming(fibMemoize)(40);
addTiming(fibMemoize)(35);

const squeak = (x) => console.log(x, "squeak!!");
const creak = (x) => console.log(x, "creak!!");
const makeSound = onceAndAfter2(squeak, creak);

makeSound("door!");
makeSound("door!");
makeSound("door!");
makeSound("door!");

const palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];

console.log("sort: ", palabras.sort(spanishComparison));

console.log("invert sort: ", palabras.sort(invert(spanishComparison)));

console.log("using unary fn: ", ["123.45", "-67.8", "90"].map(unary(parseInt)));
