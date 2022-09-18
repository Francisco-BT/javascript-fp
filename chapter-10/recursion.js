const search = (arr, key) => {
  if (arr.length === 0) {
    return false;
  } else if (arr[0] === key) {
    return true;
  } else {
    return search(arr.slice(1), key);
  }
};

const search2 = (arr, key) =>
  arr.length === 0 ? false : arr[0] === key || search2(arr.slice(1), key);

const search3 = (arr, key) =>
  arr.length && (arr[0] === key || search3(arr.slice(1), key));

const powerN = (base, power) => {
  if (power === 0) {
    return 1;
  } else if (power % 2) {
    // odd power?
    return base * powerN(base, power - 1);
  } else {
    // even power?
    return powerN(base * base, power / 2);
  }
};

const hanoi = (disks, from, to, extra) => {
  if (disks > 0) {
    hanoi(disks - 1, from, extra, to);
    console.log(`Move disk ${disks} from post ${from} to post ${to}`);
    hanoi(disks - 1, extra, to, from);
  }
};

const quicksort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const smaller = arr.slice(1).filter((x) => x < pivot);
    const greaterEqual = arr.slice(1).filter((x) => x >= pivot);
    return [...quicksort(smaller), pivot, ...quicksort(greaterEqual)];
  }
};

const memoize3 = (fn) => {
  let cache = {};
  return (...args) => {
    let strX = JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

const makeChange = memoize3((n, bills) => {
  //   console.log(n, bills.length);
  //   console.count("here");
  if (n < 0) {
    return 0; // no way of paying negative amounts
  } else if (n == 0) {
    return 1; // one single way of paying $0: with no bills
  } else if (bills.length == 0) {
    // here, n>0
    return 0; // no bills? no way of paying
  } else {
    return makeChange(n, bills.slice(1)) + makeChange(n - bills[0], bills);
  }
});

const mapR = (arr, cb) =>
  arr.length === 0 ? [] : [cb(arr[0])].concat(mapR(arr.slice(1), cb));

const mapR2 = (arr, cb, i = 0, orig = arr) =>
  arr.length == 0
    ? []
    : [cb(arr[0], i, orig)].concat(mapR2(arr.slice(1), cb, i + 1, orig));

const mapR3 = (orig, cb) => {
  const mapLoop = (arr, i) =>
    arr.length == 0
      ? []
      : [cb(arr[0], i, orig)].concat(mapLoop(arr.slice(1), i + 1));

  return mapLoop(orig, 0);
};

const mapR4 = (orig, cb) => {
  const mapLoop = (arr, i) => {
    if (arr.length == 0) {
      return [];
    } else {
      const mapRest = mapLoop(arr.slice(1), i + 1);
      if (!(0 in arr)) {
        return [,].concat(mapRest);
      } else {
        return [cb(arr[0], i, orig)].concat(mapRest);
      }
    }
  };

  return mapLoop(orig, 0);
};

const filterR = (orig, cb) => {
  const filterLoop = (arr, i) => {
    if (arr.length == 0) {
      return [];
    } else {
      const filterRest = filterLoop(arr.slice(1), i + 1);
      if (!(0 in arr)) {
        return filterRest;
      } else if (cb(arr[0], i, orig)) {
        return [arr[0]].concat(filterRest);
      } else {
        return filterRest;
      }
    }
  };

  return filterLoop(orig, 0);
};

const reduceR = (orig, cb, accum) => {
  const reduceLoop = (arr, i) => {
    return arr.length == 0
      ? accum
      : reduceR(
          arr.slice(1),
          cb,
          !(0 in arr) ? accum : cb(accum, arr[0], i, orig),
          i + 1,
          orig
        );
  };

  return reduceLoop(orig, 0);
};

const findR = (arr, cb) => {
  if (arr.length === 0) {
    return undefined;
  } else {
    return cb(arr[0]) ? arr[0] : findR(arr.slice(1), cb);
  }
};

const pipelineR = (first, ...rest) =>
  rest.length == 0 ? first : (...args) => pipelineR(...rest)(first(...args));

const checkPlace = (column, row) =>
  places
    .slice(0, column)
    .every((v, i) => v !== row && Math.abs(v - row) !== column - i);

const checkPlace2 = (column, row) => {
  const checkColumn = (i) => {
    if (i == column) {
      return true;
    } else if (places[i] == row || Math.abs(places[i] - row) == column - i) {
      return false;
    } else {
      return checkColumn(i + 1);
    }
  };

  return checkColumn(0);
};

const SIZE = 8;
let places = Array(SIZE);

let solutions = 0;
const finder = (column = 0) => {
  if (column === SIZE) {
    // all columns tried out?
    // console.log(places.map((x) => x + 1)); // print out solution
    solutions++; // count it
  } else {
    const testRowsInColumn = (j) => {
      if (j < SIZE) {
        if (checkPlace(column, j)) {
          places[column] = j;
          finder(column + 1);
        }
        testRowsInColumn(j + 1);
      }
    };

    testRowsInColumn(0);
  }
  return solutions;
};

const fs = require("fs");

const recursiveDir = (path) => {
  console.log(path);
  fs.readdirSync(path).forEach((entry) => {
    if (entry.startsWith(".")) {
      // skip it!
    } else {
      const full = path + "/" + entry;
      const stats = fs.lstatSync(full);

      if (stats.isSymbolicLink()) {
        console.log("L ", full); // symlink, don't follow
      } else if (stats.isDirectory()) {
        console.log("D ", full);
        recursiveDir(full);
      } else {
        console.log(" ", full);
      }
    }
  });
};

module.exports = {
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
  recursiveDir,
};
