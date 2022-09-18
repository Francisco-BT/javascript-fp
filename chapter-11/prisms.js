const author = {
  user: "fkereki",
  name: {
    first: "Federico",
    middle: "",
    last: "Kereki",
  },
  books: [
    { name: "GWT", year: 2010 },
    { name: "FP", year: 2017 },
    { name: "CB", year: 2018 },
  ],
};

const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

const pUser = prismProp("user");
console.log(review(pUser, author).toString());

const pPseudonym = prismProp("pseudonym");
console.log(preview(pPseudonym, author).toString());

const getFieldP = curry((attr, obj) =>
  obj && attr in obj ? obj[attr] : undefined
);

const setFieldP = curry((attr, value, obj) =>
  obj && attr in obj ? { ...obj, [attr]: value } : { ...obj }
);
