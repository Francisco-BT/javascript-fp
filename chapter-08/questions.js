// 7.1. Sum as you will
const sumMany = (total) => (number) =>
  number === undefined ? total : sumMany(total + number);

console.log("7.1 sumMany: ", sumMany(9)(2)(3)(1)(4)(3)());
console.log("7.1 sumMany: ", sumMany()());

// 7.2. Working stylishly:
const applyStyle = (style) => (text) => `<${style}>${text}</${style}>`;
const makeBold = applyStyle("b");
const makeUnderline = applyStyle("u");

console.log("7.2 makeBold: ", makeBold("Montevideo"));
console.log("7.2 makeUnderline: ", makeUnderline("Uruguay"));

// 7.3. Currying by prototype:
Function.prototype.curry = function () {
  return this.length === 0 ? this() : (p) => this.bind(this, p).curry();
};

const sum3 = (a, b, c) => 100 * a + 10 * b + c;
console.log("7.3 sum: ", sum3.curry()(1)(2)(4));

const sum3C = sum3.curry()(2)(2);
console.log("7.3 sum3C: ", sum3C(9));

// 7.4. Uncurrying the curried:
const make3 = (a, b, c) => String(100 * a + 10 * b + c);
const make3c = (a) => (b) => (c) => make3(a, b, c);
console.log(make3c(1)(2)(3)); // 123

const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);
const uncurry = (fn, len) =>
  eval(
    `(${range(0, len)
      .map((i) => `x${i}`)
      .join(",")}) => ${fn.name}${range(0, len)
      .map((i) => `(x${i})`)
      .join("")}`
  );
const remake3 = uncurry(make3c, 3);
console.log(remake3(1, 2, 3)); // 123

// 7.5. Mystery questions function:
const what =
  (who) =>
  (...why) =>
    who.length <= why.length
      ? who(...why)
      : (...when) => what(who)(...why, ...when);

const alt3 = what(sum3);

console.log(alt3(1, 2, 4));
console.log(alt3(1, 2)(4));
console.log(alt3(1)(2, 4));
console.log(alt3(1)(2)(4));

const partial =
  (fn) =>
  (...params) =>
    fn.length <= params.length
      ? fn(...params)
      : (...otherParams) => partial(fn)(...params, ...otherParams);

// 7.6. Yet more curry!
const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

const make3curried = curry(make3);

console.log(make3curried(1)(2)(3));
console.log(make3curried(4, 5)(6));
console.log(make3curried(7, 8, 9));
