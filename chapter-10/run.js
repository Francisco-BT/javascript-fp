const {
  hanoi,
  quicksort,
  makeChange,
  mapR,
  mapR2,
  mapR3,
  mapR4,
  filterR,
  reduceR,
  findR,
  pipelineR,
  finder,
} = require("./recursion");

// hanoi(4, "A", "B", "C"); // we want to move all disks from A to B

// console.log(quicksort([22, 9, 60, 12, 4, 56]));

// console.log(makeChange(64, [100, 50, 20, 10, 5, 2, 1]));

let aaa = [1, 2, 4, 5, 7];
const timesTen = (x) => x * 10;

// console.log(mapR(aaa, timesTen)); // [10, 20, 40, 50, 70]

const timesTenPlusI = (v, i) => 10 * v + i;
// console.log(mapR4(aaa, timesTenPlusI)); // [NaN, NaN, NaN, NaN, NaN]

const senseless = (x, i, a) => x * 10 + i + a[i] / 10;
console.log(mapR3(aaa, senseless)); // [10.1, 21.2, 42.4, 53.5, 74.7]

// console.log(mapR2(aaa, timesTen)); // [10, 20, undefined × 2, 50]

const withUndefined = [1, 2, , , 5];
console.log(mapR4(withUndefined, timesTen));

let aaaa = [1, 12, , , 5, 22, 9, 60];
const isOdd = (x) => x % 2;
console.log(filterR(aaaa, isOdd)); // [1, 5, 9]

let bbb = [1, 2, , 5, 7, 8, 10, 21, 40];
console.log(reduceR(bbb, (x, y) => x + y, 0)); // 94

let ccc = [1, 12, , , 5, 22, 9, 60];

const isTwentySomething = (x) => 20 <= x && x <= 29;
console.log(findR(ccc, isTwentySomething)); // 22

const isThirtySomething = (x) => 30 <= x && x <= 39;
console.log(findR(ccc, isThirtySomething)); // undefined

const plus1 = (x) => x + 1;
const by10 = (x) => x * 10;

console.log(pipelineR(plus1)(1));
console.log(
  pipelineR(
    by10,
    plus1,
    plus1,
    plus1,
    by10,
    plus1,
    by10,
    by10,
    plus1,
    plus1,
    plus1
  )(2)
);

console.log("solutions: ", finder());
