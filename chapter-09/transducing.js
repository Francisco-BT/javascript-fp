const testOdd = (x) => x % 2 === 1;
const testUnderFifty = (x) => x < 50;
const duplicate = (x) => x + x;
const addThree = (x) => x + 3;

const mapTR = (fn) => (reducer) => (accum, value) => reducer(accum, fn(value));

const filterTR = (fn) => (reducer) => (accum, value) =>
  fn(value) ? reducer(accum, value) : accum;

const testOddR = filterTR(testOdd);
const testUnderFiftyR = filterTR(testUnderFifty);
const duplicateR = mapTR(duplicate);
const addThreeR = mapTR(addThree);

const addToArray = (a, v) => {
  a.push(v);
  return a;
};

const compose = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

const makeReducer1 = (arr, fns) => arr.reduce(compose(...fns)(addToArray), []);

const makeReducer2 = (arr, fns, reducer = addToArray, initial = []) =>
  arr.reduce(compose(...fns)(reducer), initial);

module.exports = {
  testOdd,
  testUnderFifty,
  duplicate,
  addThree,
  mapTR,
  filterTR,
  testOddR,
  testUnderFiftyR,
  duplicateR,
  addThreeR,
  addToArray,
  makeReducer1,
  makeReducer2,
};
