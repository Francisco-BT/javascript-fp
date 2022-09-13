const not =
  (fn) =>
  (...args) =>
    !fn(...args);

const demethodize =
  (fn) =>
  (arg0, ...args) =>
    fn.apply(arg0, args);

const removeNonAlpha = (str) => {
  console.log("remove non alpha");
  return str.replace(/[^a-z]/gi, " ");
};
const toUpperCase = demethodize(String.prototype.toUpperCase);
const splitInWords = (str) => str.trim().split(/\s+/);
const arrayToSet = (arr) => new Set(arr);
const setToList = (set) => Array.from(set).sort();

const pipeTwo = (f, g) => {
  // console.log("f: ", f.toString());
  console.log("g: ", g.toString());
  return (...args) => {
    const result = g(f(...args));
    // console.log("result: ", result);
    return result;
  };
};

const composeTwo =
  (f, g) =>
  (...args) =>
    f(g(...args));

const pipeline = (...fns) => fns.reduce(pipeTwo);
const pipeline2 = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );

const compose = (...fns) => pipeline(...fns.reverse());
const compose2 = (...fns) => fns.reduceRight(pipeTwo);
const compose3 = (...fns) => fns.reduce(composeTwo);
const compose4 = (...fns) => pipeline2(...fns.reverse());

const getUniqueWords = compose4(
  setToList,
  arrayToSet,
  splitInWords,
  toUpperCase,
  removeNonAlpha
);

module.exports = {
  getUniqueWords,
  pipeTwo,
  pipeline,
  compose,
};
