/**
 * High order function that ensures a function is called only once
 * @param {*} fn
 * @returns
 */
const once = (fn) => {
  return (...args) => {
    fn && fn(...args);
    fn = null;
  };
};

const squeak = (a) => console.log(a, " squeak!!!");

squeak("original");
squeak("original");

const squeakOnce = once(squeak);

squeakOnce("only once");
squeakOnce("only once");
squeakOnce("only once");

module.exports = { once };
