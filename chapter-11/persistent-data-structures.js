class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

const setIn = (arr, val, obj) => {
  const newObj = Number.isInteger(arr[0]) ? [] : {};

  Object.keys(obj).forEach((k) => {
    newObj[k] = k !== arr[0] ? obj[k] : null;
  });

  newObj[arr[0]] = arr.length > 1 ? setIn(arr.slice(1), val, obj[arr[0]]) : val;
  return newObj;
};

let myObj1 = {
  a: 111,
  b: 222,
  c: 333,
  d: {
    e: 444,
    f: 555,
    g: {
      h: 666,
      i: 777,
    },
    j: [{ k: 100 }, { k: 200 }, { k: 300 }],
  },
};

let myObj2 = setIn(["d", "f"], 88888, myObj1);
// console.log(myObj2);

const deleteIn = (arr, obj) => {
  const newObj = Number.isInteger(arr[0]) ? [] : {};

  Object.keys(obj).forEach((k) => {
    if (k !== arr[0]) {
      newObj[k] = obj[k];
    }
  });

  if (arr.length > 1) {
    newObj[arr[0]] = deleteIn(arr.slice(1), obj[arr[0]]);
  }
  return newObj;
};

const myObj4 = deleteIn(["d", "g"], myObj1);
console.log(myObj4);
