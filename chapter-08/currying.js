const make3 = (a, b, c) => String(100 * a + 10 * b + c);

const make3curried = (a) => (b) => (c) => String(100 * a + 10 * b + c);

const addVAT = (rate, amount) => amount * (1 + rate / 100);

const addVATcurried = (rate) => (amount) => amount * (1 + rate / 100);

const addNationalVAT = addVATcurried(6);

const sum = (x, y) => {
  if (x !== undefined && y !== undefined) {
    return x + y;
  } else if (x !== undefined && y == undefined) {
    return (z) => sum(x, z);
  } else {
    return sum;
  }
};

const curryByBind = (fn) =>
  fn.length === 0 ? fn() : (p) => curryByBind(fn.bind(null, p));

const curryByBind2 = (fn, len = fn.length) =>
  len === 0 ? fn() : (p) => curryByBind2(fn.bind(null, p), len - 1);

const sum2 = (...args) => args.reduce((x, y) => x + y, 0);

const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);

const curryByEval = (fn, len = fn.length) =>
  eval(`${range(0, len)
    .map((i) => `x${i}`)
    .join("=>")} => 
    ${fn.name}(${range(0, len)
    .map((i) => `x${i}`)
    .join(",")})`);

const curryByEval2 = (fn, len = fn.length) =>
  eval(`${range(0, len)
    .map((i) => `x${i}`)
    .join("=>")} => 
    (${fn.toString()})(${range(0, len)
    .map((i) => `x${i}`)
    .join(",")})`);

module.exports = {
  make3,
  make3curried,
  addVAT,
  addVATcurried,
  addNationalVAT,
  curryByBind,
  curryByBind2,
  sum2,
  curryByEval,
  curryByEval2,
};
