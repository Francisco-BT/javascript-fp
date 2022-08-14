const {
  someFunction,
  addLogging,
  changeSign,
  subtract,
  addTiming,
  memoize,
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
