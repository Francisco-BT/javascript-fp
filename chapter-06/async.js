const fakeAPI = (delay, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));

const useResult = (x) => console.log(`${new Date().toISOString()}: ${x}`);

// (async () => {
//   console.log("START");
//   console.log(new Date());
//   const result = await fakeAPI(1000, 229);
//   useResult(result);
//   console.log("END");
// })();

// Async problems with forEach
// (() => {
//   console.log("START FOREACH");

//   [1, 2, 3, 4].forEach(async (n) => {
//     const x = await fakeAPI(n * 1000, n);
//     useResult(x);
//   });

//   console.log("END FOREACH");
// })();

const forEachAsync = (arr, fn) =>
  arr.reduce(
    (promise, value) => promise.then(() => fn(value)),
    Promise.resolve()
  );

// (async () => {
//   console.log("START FOREACH VIA REDUCE");
//   await forEachAsync([1, 2, 3, 4], async (n) => {
//     const x = await fakeAPI(n * 1000, n);
//     useResult(x);
//   });
//   console.log("END FOREACH VIA REDUCE");
// })();

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

// (async () => {
//   console.log("START MAP");

//   const mapped = await mapAsync([1, 2, 3, 4], async (n) => {
//     const x = await fakeAPI(n * 1000, n);
//     return x;
//   });

//   useResult(mapped);
//   console.log("END MAP");
// })();

const filterAsync = (arr, fn) =>
  mapAsync(arr, fn).then((arr2) => arr.filter((v, i) => Boolean(arr2[i])));

const fakeFilter = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value % 2 === 0), 1000));

// (async () => {
//   console.log("START FILTER");

//   const filtered = await filterAsync([1, 2, 3, 4], async (n) => {
//     const x = await fakeFilter(n);
//     return x;
//   });

//   useResult(filtered);
//   console.log("END FILTER");
// })();

const reduceAsync = (arr, fn, init) =>
  Promise.resolve(init).then((accum) =>
    forEachAsync(arr, async (v, i) => {
      accum = await fn(accum, v, i);
    }).then(() => accum)
  );

const fakeSum = (value1, value2) =>
  new Promise((resolve) => setTimeout(() => resolve(value1 + value2), 1000));

(async () => {
  console.log("START REDUCE");

  const summed = await reduceAsync(
    [1, 2, 3, 4],
    async (_accum, n) => {
      const accum = await _accum;
      const x = await fakeSum(accum, n);
      useResult(`accumulator=${accum} value=${x} `);
      return x;
    },
    0
  );

  useResult(summed);
  console.log("END REDUCE");
})();
