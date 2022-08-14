const { performance } = require("perf_hooks");

function someFunction(param1, param2, param3) {
  console.log("entering someFunction: ", param1, param2, param3);
  // do something
  // do something else
  // and a bit more,
  // and finally
  const auxValue = 1;
  console.log("exiting someFunction: ", auxValue);
  return auxValue;
}

const addLogging =
  (fn) =>
  (...args) => {
    console.log(`entering ${fn.name}: ${args}`);
    try {
      const valueToReturn = fn(...args);
      console.log(`exiting ${fn.name}: ${valueToReturn}`);
      return valueToReturn;
    } catch (error) {
      console.log(`exiting ${fn.name}: threw ${error}`);
      throw error;
    }
  };

function subtract(a, b) {
  if (b === 0) {
    throw "CRASH!";
  }

  b = changeSign(b);
  return a + b;
}

function changeSign(c) {
  return -c;
}

const addLogging3 =
  (fn, logger = console.log) =>
  (...args) => {
    logger(`entering ${fn.name}: ${args}`);
    try {
      const valueToReturn = fn(...args);
      logger(`exiting ${fn.name}: ${valueToReturn}`);
      return valueToReturn;
    } catch (thrownError) {
      logger(`exiting ${fn.name}: threw ${thrownError}`);
      throw thrownError;
    }
  };

const myPut = (text, name, tStart, tEnd) => {
  console.log(`${name} - ${text} ${tEnd - tStart} ms`);
};

const myGet = () => performance.now();

const addTiming =
  (fn, getTime = myGet, output = myPut) =>
  (...args) => {
    const start = getTime();

    try {
      const valueToReturn = fn(...args);
      output("normal exit", fn.name, start, getTime());
      return valueToReturn;
    } catch (thrownError) {
      output("exception thrown", fn.name, start, getTime());
      throw thrownError;
    }
  };

function fib(n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

const memoize = (fn) => {
  let cache = {};
  return (x) => {
    return x in cache ? cache[x] : (cache[x] = fn(x));
  };
};

const memoize2 = (fn) => {
  if (fn.length === 1) {
    let cache = {};
    return (x) => (x in cache ? cache[x] : (cache[x] = fn(x)));
  } else {
    return fn;
  }
};

const memoize3 = (fn) => {
  let cache = {};
  const PRIMITIVES = ["number", "string", "boolean"];
  return (...args) => {
    let strX =
      args.length === 1 && PRIMITIVES.includes(typeof args[0])
        ? args[0]
        : JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

const memoize4 = (fn) => {
  let cache = {};
  return (...args) => {
    let strX = JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

const once = (func) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      func(...args);
    }
  };
};

const once2 = (func) => {
  let done = false;
  let result;
  return (...args) => {
    if (!done) {
      done = true;
      result = func(...args);
    }
    return result;
  };
};

const onceAndAfter = (f, g) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      return f(...args);
    } else {
      return g(...args);
    }
  };
};

const onceAndAfter2 = (f, g) => {
  let toCall = f;
  return (...args) => {
    let result = toCall(...args);
    toCall = g;
    return result;
  };
};

const not =
  (fn) =>
  (...args) =>
    !fn(...args);

const filterNot = (arr) => (fn) => arr.filter(not(fn));

const spanishComparison = (a, b) => a.localeCompare(b, "es");

const invert =
  (fn) =>
  (...args) =>
    -fn(...args);

const arity =
  (fn, n) =>
  (...args) =>
    fn(...args.slice(0, n));

const unary = (fn) => arity(fn, 1);

const binary = (fn) => arity(fn, 2);

const ternary = (fn) => arity(fn, 3);

module.exports = {
  someFunction,
  addLogging,
  subtract,
  changeSign,
  addLogging3,
  myPut,
  myGet,
  addTiming,
  fib,
  memoize,
  memoize2,
  memoize3,
  memoize4,
  once,
  once2,
  onceAndAfter,
  onceAndAfter2,
  not,
  filterNot,
  spanishComparison,
  invert,
  unary,
  binary,
  ternary,
  arity,
};
