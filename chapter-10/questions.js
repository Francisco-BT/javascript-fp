// 1. Reverse
const reverse = (original) => {
  const loop = (arr, pending) => {
    if (pending === 0) {
      return [...arr];
    }
    return [arr[pending], ...reverse(arr.slice(0, pending), pending - 1)];
  };

  return loop(original, original.length - 1);
};

const arr = [1, 2, 3, 4, 5];
const str = "montevideo";
console.log(reverse(arr));
console.log(reverse(str.split("")).join(""));

// 3. Longest common subsequence
const LCS = (strA, strB) => {
  let cache = {}; // memoization "by hand"

  const innerLCS = (strA, strB) => {
    const key = strA + "/" + strB;

    if (!(key in cache)) {
      if (strA.length === 0 || strB.length === 0) {
        ret = 0;
      } else if (strA[0] === strB[0]) {
        ret = 1 + innerLCS(strA.substr(1), strB.substr(1));
      } else {
        ret = Math.max(
          innerLCS(strA, strB.substr(1)),
          innerLCS(strA.substr(1), strB)
        );
      }

      cache[key] = ret;
    }

    return cache[key];
  };

  return innerLCS(strA, strB);
};

console.log(LCS("INTERNATIONAL", "CONTRACTOR")); // 6, as in the text

// 4. Symmetrical queens
const SIZE = 8;
let places = Array(SIZE);
const checkPlace = (column, row) =>
  places
    .slice(0, column)
    .every((v, i) => v !== row && Math.abs(v - row) !== column - i);

const symmetricFinder = (column = 0) => {
  if (column === SIZE) {
    console.log(places.map((x) => x + 1)); // print out solution
  } else if (column <= SIZE / 2) {
    // first half of the board?
    const testRowsInColumn = (j) => {
      if (j < SIZE) {
        if (checkPlace(column, j)) {
          places[column] = j;
          symmetricFinder(column + 1);
        }
        testRowsInColumn(j + 1);
      }
    };
    testRowsInColumn(0);
  } else {
    // second half of the board
    let symmetric = SIZE - 1 - places[SIZE - 1 - column];
    if (checkPlace(column, symmetric)) {
      places[column] = symmetric;
      symmetricFinder(column + 1);
    }
  }
};

// symmetricFinder();

// 5. Sorting
const toSort = [2, 2, 0, 9, 1, 9, 6, 0];

const selectionSort = (arr) => {
  if (arr.length === 0) {
    return [];
  } else {
    const max = Math.max(...arr);
    const rest = [...arr];
    rest.splice(arr.indexOf(max), 1);
    return [...selectionSort(rest), max];
  }
};

console.log(selectionSort(toSort));

// 7. Recursive logic
const testArr = [1, 2, 3, 4];
const everyR = (arr, fn) => {
  const loop = (a, acc) => {
    if (a.length === 0 && acc === 0) {
      return false;
    }

    if (acc === arr.length - 1) {
      return true;
    }

    return fn(a[0]) ? loop(a.slice(1), acc + 1) : false;
  };

  return loop(arr, 0);
};

const someR = (arr, fn) => {
  const loop = (a) => {
    if (a.length === 0) {
      return false;
    }

    return fn(a[0]) ? true : loop(a.slice(1));
  };

  return loop(arr, 0);
};

console.log(testArr.some((x) => x > 4));
console.log(someR(testArr, (x) => x > 4));
console.log(testArr.every((x) => x > 10));
console.log(everyR(testArr, (x) => x > 10));

// 9. More efficiency
const partition = (arr, predicate) => {
  return arr.reduce(
    (result, curr) => {
      result[predicate(curr) ? 0 : 1].push(curr);
      return result;
    },
    [[], []]
  );
};

const quicksort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const [smaller, greaterEqual] = partition(arr.slice(1), (x) => x < pivot);
    return [...quicksort(smaller), pivot, ...quicksort(greaterEqual)];
  }
};

console.log(quicksort([4, 6, 5, 9, 1, 4, 5]));
