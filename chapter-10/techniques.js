function getTime(cont) {
  return cont(new Date().toTimeString());
}

function factC(n, cont) {
  if (n === 1) {
    return cont(1);
  }
  const v = factC(n - 1, (x) => cont(n * x));
  return v;
}

const fibC = (n, cont) => {
  if (n <= 1) {
    return cont(n);
  } else {
    return fibC(n - 2, (p) => fibC(n - 1, (q) => cont(p + q)));
  }
};

getTime(console.log);
console.log(factC(7, (x) => x));

const getIsoDateAndTime = () => new Date().toISOString(); // a thunk

const isoDateAndTime = getIsoDateAndTime(); // getting the thunk's value
console.log(isoDateAndTime);

function Thunk(fn) {
  this.fn = fn;
}

const trampoline = (thk) => {
  while (typeof thk === "object" && thk.constructor.name === "Thunk") {
    thk = thk.fn();
  }
  console.log(thk);
  return thk;
};

// const sumAll = (n) => (n == 0 ? 0 : n + sumAll(n - 1));
// const sumAll = (n, cont) =>
//   n === 0 ? cont(0) : sumAll(n - 1, (v) => cont(v + n)); // continuation passing style
// const sumAllT = (n, cont) =>
//   n === 0 ? () => cont(0) : () => sumAllT(n - 1, (v) => () => cont(v + n));
const sumAllT = (n, cont) =>
  n === 0
    ? new Thunk(() => cont(0))
    : new Thunk(() => sumAllT(n - 1, (v) => new Thunk(() => cont(v + n))));
const sumAll = (n) => trampoline(sumAllT(n, (x) => x));
console.log("\nsumAll", sumAll(10));
console.log("sumAll", sumAll(100, console.log));
console.log("sumAll", sumAll(1000, console.log));
console.log("sumAll", sumAll(10000, console.log));
console.log("sumAll\n", sumAll(100000, console.log));
