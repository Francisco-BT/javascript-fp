const {
  addLogging,
  changeSign,
  subtract,
  addTiming,
  memoize,
  onceAndAfter2,
  spanishComparison,
  invert,
  unary,
} = require("./functions");
const {
  getField,
  demethodize1,
  demethodize3,
  demethodize2,
  findOptimum,
  findMaximum,
  findMinimum,
  Hero,
  findBestHero,
} = require("./changingFn");

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

const myObject = {
  a: "a value",
  b: "b value",
};

console.log("getting a using getField: ", getField("a")(myObject));
console.log("getting b using getField: ", getField("b")(myObject));

const name = "functional";
const demethodizedMap = demethodize1(Array.prototype.map);
const toUpper = demethodize3(String.prototype.toUpperCase);

const result = demethodizedMap(name, toUpper);
console.log("result using demethodized methods: ", result);

const toLocaleString = demethodize2(Number.prototype.toLocaleString);

const numbers = [2209.6, 124.56, 1048576];
const strings = numbers.map(toLocaleString);
const strings2 = demethodizedMap(numbers, toLocaleString);
console.log("numbers to string: ", strings);
console.log("numbers to string using demethodized map: ", strings2);

const myArray = [22, 9, 60, 12, 4, 56];
console.log("optimum: ", findOptimum(myArray));

console.log("find minimum: ", findMinimum(myArray));
console.log("find maximum: ", findMaximum(myArray));

const codingLeagueOfAmerica = [
  new Hero("Forceful", 20, 15, 2),
  new Hero("Electrico", 12, 21, 8),
  new Hero("Speediest", 8, 11, 4),
  new Hero("TechWiz", 6, 16, 30),
];

console.log("best hero is: ", findBestHero(codingLeagueOfAmerica));
