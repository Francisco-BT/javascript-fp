const { getField } = require("./changingFn");

// 6.1 A border case
const getFieldOnNull = getField("a")(null);
console.log("getField on null: ", getFieldOnNull);

// 6.3 A randomizing balancer
const shuffle = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let r = Math.floor(Math.random() * (len - i));
    [arr[i], arr[i + r]] = [arr[i + r], arr[i]];
  }
  return arr;
};

const randomizer =
  (...fns) =>
  (...args) => {
    const first = fns.shift();
    shuffle(fns);
    fns.push(first);
    return fns[0](...args);
  };

const randomizer2 = (...fns) => {
  let called = null;
  const caller = (...args) => {
    shuffle(fns);
    if (called === fns[0]) {
      return caller(...fns);
    } else {
      called = fns[0];
      return called(...args);
    }
  };
  return caller;
};

const say1 = () => console.log(1);
const say22 = () => console.log(22);
const say333 = () => console.log(333);
const say4444 = () => console.log(4444);

const rrr = randomizer2(say1, say22, say333, say4444);
rrr(); // 333
rrr(); // 4444
rrr(); // 333
rrr(); // 22

// 6.5. Missing companion
const setField = (attr, value) => (obj) =>
  Object.assign(
    {
      [attr]: value,
    },
    obj
  );

const myObj = { a: "a" };
console.log("setField in my obj: ", setField("b", "this is b")(myObj));
console.log("my obj is: ", myObj);

// 6.7. Not reinventing the wheel
const myArray = [4, 53, 14, -3];
const findMinimum = (arr) => Math.min(...arr);
const findMaximum = (arr) => Math.max(...arr);

console.log("findMinimum: ", findMinimum(myArray));
console.log("findMaximum: ", findMaximum(myArray));
