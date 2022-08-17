const nonsense = (a, b, c, d, e) => `${a}/${b}/${c}/${d}/${e}`;

const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);

const partialByEval = (fn, ...args) => {
  const rangeArgs = range(0, fn.length);

  const leftList = rangeArgs
    .map((v) => (args[v] === undefined ? `x${v}` : null))
    .filter((v) => !!v)
    .join(",");

  console.log("left list: ", leftList);

  const rightList = rangeArgs
    .map((v) => (args[v] === undefined ? `x${v}` : args[v]))
    .join(",");
  console.log("right list: ", rightList);

  return eval(`(${leftList}) => ${fn.name}(${rightList})`);
};

const partialByEval2 = (fn, ...args) =>
  eval(
    `(${range(0, fn.length)
      .map((v) => (args[v] === undefined ? `x${v}` : null))
      .filter((v) => !!v)
      .join(",")}) => ${fn.name}(${range(0, fn.length)
      .map((v) => (args[v] == undefined ? `x${v}` : args[v]))
      .join(",")})`
  );

const partialByClosure = (fn, ...args) => {
  const partialize =
    (...args1) =>
    (...args2) => {
      for (let i = 0; i < args1.length && args2.length; i++) {
        if (args1[i] === undefined) {
          args1[i] = args2.shift();
        }
      }

      const allParams = [...args1, ...args2];
      return (
        allParams.includes(undefined) || allParams.length < fn.length
          ? partialize
          : fn
      )(...allParams);
    };

  return partialize(...args);
};

module.exports = {
  nonsense,
  partialByEval,
  partialByEval2,
  partialByClosure,
};
