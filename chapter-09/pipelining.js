const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

function getDir(path) {
  console.log("path is: ", path);
  const fs = require("fs");
  const files = fs.readdirSync(path);
  return files;
}

const count = (arr) => arr.length;

const filterByText = (text, arr) => arr.filter((v) => v.endsWith(text));

const filterOdt = (arr) => filterByText(".odt", arr);
const filterOdt2 = curry(filterByText)(".odt");

const countOdtFiles = (path) => {
  const files = getDir(path);
  const filteredFiles = filterOdt(files);
  const countOfFiles = count(filteredFiles);

  return countOdtFiles;
};

const countOdtFiles2 = (path) => count(filterOdt(getDir(path)));

const pipeTwo =
  (f, g) =>
  (...args) =>
    g(f(...args));

const countOdtFiles3 = (path) =>
  pipeTwo(pipeTwo(getDir, filterOdt), count)(path);

const countOdtFiles4 = (path) =>
  pipeTwo(getDir, pipeTwo(filterOdt, count))(path);

const pipeline =
  (...fns) =>
  (...args) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = fns[i](result);
    }

    return result;
  };

const pipeline2 = (...fns) =>
  fns.reduce(
    (result, fn) =>
      (...args) =>
        fn(result(...args))
  );

const pipeline3 = (...fns) => fns.reduce(pipeTwo);

const tee = (arg) => {
  console.log(arg);
  return arg;
};

const tee2 = (arg, logger = console.log) => (logger(arg), arg);

const tap = curry((fn, x) => (fn(x), x));

const tee3 = tap(console.log);

const getField = (attr, obj) => obj[attr];
const getBalance = curry(getField)("balance");
const isNegative = (x) => x < 0;

const isNegativeBalance = pipeline(getBalance, isNegative);

// const isNegativeBalance2 = pipeline(
//   curry(getField)("balance"),
//   curry(binaryOp(">"))(0)
// );

module.exports = {
  curry,
  getDir,
  count,
  filterByText,
  filterOdt,
  filterOdt2,
  countOdtFiles,
  countOdtFiles2,
  countOdtFiles3,
  countOdtFiles4,
  pipeline,
  pipeline2,
  pipeline3,
  tee,
  tee2,
  tee3,
  tap,
};
