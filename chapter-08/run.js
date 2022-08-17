const {
  addVAT,
  addNationalVAT,
  curryByBind,
  make3,
  curryByBind2,
  sum2,
  curryByEval2,
} = require("./currying");
const {
  partialByEval,
  nonsense,
  partialByClosure,
} = require("./partialApplication");
const {} = require("./partialCurrying");

console.log("using addVAT: ", addVAT(20, 500));
console.log("using addVAT: ", addVAT(15, 200));

console.log("using national VAT with currying: ", addNationalVAT(1500));

// Using currying by bind
const f1 = curryByBind(make3);
const f2 = f1(6);
const f3 = f2(5);
const f4 = f3(8);
console.log("f4 after currying is:", f4);

const curriedSum5 = curryByBind2(sum2, 5);
console.log("using curriedSum5: ", curriedSum5(1)(2)(3)(4)(5));

console.log("curry by eval: ", curryByEval2(make3)(1)(2)(3));

// PARTIAL APPLICATION
const fix2And5 = partialByEval(
  nonsense,
  undefined,
  22,
  undefined,
  undefined,
  1960
);

console.log(fix2And5.toString());

const partialMake3Fix1 = partialByClosure(make3, undefined, 4);
console.log(partialMake3Fix1.toString());
const partialMake3Fix2 = partialMake3Fix1(5);
console.log(partialMake3Fix2.toString());
const finallMake3 = partialMake3Fix2(3);
console.log(finallMake3.toString());
