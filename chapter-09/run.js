const {
  pipeline,
  getDir,
  filterOdt,
  count,
  pipeline2,
  pipeline3,
  tee,
  tee2,
  tee3,
} = require("./pipelining");

const { City, chainify } = require("./chaining");

const { getUniqueWords } = require("./composing");

const {
  testOdd,
  duplicate,
  testUnderFifty,
  addThree,
  testOddR,
  duplicateR,
  testUnderFiftyR,
  addThreeR,
  addToArray,
  makeReducer1,
  makeReducer2,
} = require("./transducing");

// console.log(
//   "count using pipeline: ",
//   pipeline(getDir, filterOdt, count)("/Users/fbernabe/Documents/")
// );

// console.log(
//   "with pipeline2: ",
//   pipeline2(getDir, filterOdt, count)("/Users/fbernabe/Documents")
// );

// console.log(
//   "with pipeline3: ",
//   pipeline3(getDir, filterOdt, count)("/Users/fbernabe/Documents")
// );

// console.log("pipeline with tee interception: ");
// pipeline2(getDir, tee, filterOdt, tee, count)("/Users/fbernabe/Documents");
// pipeline2(getDir, tee2, filterOdt, tee2, count)("/Users/fbernabe/Documents");

// console.log(
//   "pipeline using tap3: ",
//   pipeline(getDir, tee3, count)("/Users/fbernabe/Documents")
// );

let myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
myCity = chainify(myCity);
// console.log(
//   myCity.setName("Pune, India").setLat(18.5626).setLong(73.8087).getCoords(),
//   myCity.getName()
// );

const GETTYSBURG_1_2 = `Four score and seven years ago 
our fathers brought forth on this continent, a new nation, 
conceived in liberty, and dedicated to the proposition 
that all men are created equal. Now we are engaged in a 
great civil war, testing whether that nation, or any 
nation so conceived and so dedicated, can long
endure.`;

// console.log(getUniqueWords(GETTYSBURG_1_2));

// TRANSDUCING
const myArray = [22, 9, 60, 24, 11, 63];
const a0 = myArray
  .filter(testOdd)
  .map(duplicate)
  .filter(testUnderFifty)
  .map(addThree);

// console.log("a0: ", a0);

const a1 = myArray.reduce(
  testOddR(duplicateR(testUnderFiftyR(addThreeR(addToArray)))),
  []
);
console.log("a1: ", a1);

const a2 = makeReducer1(myArray, [
  testOddR,
  duplicateR,
  testUnderFiftyR,
  addThreeR,
]);

console.log("a2: ", a2);

const sum = makeReducer2(
  myArray,
  [testOddR, duplicateR, testUnderFiftyR, addThreeR],
  (acc, value) => acc + value,
  0
);
console.log("sum: ", sum);
