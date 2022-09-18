const author = {
  user: "fkereki",
  name: {
    first: "Federico",
    middle: "",
    last: "Kereki",
  },
  books: [
    { name: "Google Web Toolkit", year: 2010 },
    { name: "Functional Programming", year: 2017 },
    { name: "Javascript Cookbook", year: 2018 },
  ],
};

const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

const getField = (attr) => (obj) => obj[attr];

const setField = (attr) => (value, obj) => {
  return {
    ...obj,
    [attr]: value,
  };
};

const lens = (getter, setter) => ({ getter, setter });
const lensProp = (attr) => lens(getField(attr), setField(attr));
const lens1 = lensProp("user");

// lens operations
const view = curry((lens, obj) => lens.getter(obj));
const set = curry((lens, newVal, obj) => lens.setter(newVal, obj));
const over = curry((lens, mapfn, obj) =>
  lens.setter(mapfn(lens.getter(obj)), obj)
);

const composeTwoLenses = (lens1, lens2) => ({
  getter: (obj) => lens2.getter(lens1.getter(obj)),
  setter: curry((newVal, obj) =>
    lens1.setter(lens2.setter(newVal, lens1.getter(obj)), obj)
  ),
});

const deepObject = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 6,
      g: { i: 9, j: { k: 11 } },
      h: 8,
    },
  },
};
// console.log(deepObject);
const lA = lensProp("a");
const setTo10 = set(lA, 10, deepObject);

const lC = lensProp("c");
const lE = lensProp("e");
const lG = lensProp("g");
const lJ = lensProp("j");
const lK = lensProp("k");

const lJK = composeTwoLenses(lJ, lK);
const lGJK = composeTwoLenses(lG, lJK);
const lEGJK = composeTwoLenses(lE, lGJK);
const lCEGJK1 = composeTwoLenses(lC, lEGJK);
// console.log(view(lCEGJK1)(deepObject));

const lCE = composeTwoLenses(lC, lE);
const lCEG = composeTwoLenses(lCE, lG);
const lCEGJ = composeTwoLenses(lCEG, lJ);
const lCEGJK2 = composeTwoLenses(lCEGJ, lK);
const setTo60 = set(lCEGJK2, 60, deepObject);
console.log(view(lCEGJK2, setTo60));

const setToDouble = over(lCEGJK2, (x) => x * 2, deepObject);
console.log(view(lCEGJK2, setToDouble));

const lens2 = (getter, setter) => (fn) => (obj) =>
  fn(getter(obj)).map((value) => setter(value, obj));

class Constant {
  constructor(v) {
    this.value = v;
    this.map = () => this;
  }
}

const view2 = curry((lensAttr, obj) => {
  return lensAttr((x) => new Constant(x))(obj).value;
});

const lensProp2 = (attr) => lens2(getField(attr), setField(attr));

const user = view2(lensProp2("user"), author);
console.log(user);

class Variable {
  constructor(v) {
    this.value = v;
    this.map = (fn) => new Variable(fn(v));
  }
}

const set2 = curry(
  (lensAttr, newVal, obj) => lensAttr(() => new Variable(newVal))(obj).value
);
const changedUser = set2(lensProp2("user"), "FEFK", author);
console.log("changedUser: ", changedUser);

const over2 = curry(
  (lensAttr, mapfn, obj) => lensAttr((x) => new Variable(mapfn(x)))(obj).value
);

const newAuthor = over2(lensProp2("user"), (x) => x + x + x, author);
console.log("new Author: ", newAuthor);

// const lastName = view(
//     compose(
//       lensProp("name"),
//       lensProp("last")
//     )
//   )(author);
