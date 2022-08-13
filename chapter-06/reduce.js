const myArray = [22, 9, 60, 12, 4, 56];
const sum = (x, y) => x + y;
const sumAndLog = (x, y) => {
  console.log(`${x}+${y}=${x + y}`);
  return x + y;
};

const mySum = myArray.reduce(sumAndLog, 0);
console.log("my sum is: ", mySum);

const average = (arr) => arr.reduce(sum, 0) / arr.length;
console.log("average: ", average(myArray));

const average2 = (sum, val, ind, arr) => {
  sum += val;
  return ind === arr.length - 1 ? sum / arr.length : sum;
};
console.log("with average2: ", myArray.reduce(average2, 0)); // 27.166667

const average3 = (arr) => {
  const sumCount = arr.reduce(
    (acc, value) => ({ sum: value + acc.sum, count: acc.count + 1 }),
    { sum: 0, count: 0 }
  );

  console.log("sumCount is: ", sumCount);
  return sumCount.sum / sumCount.count;
};
console.log("with average3: ", average3(myArray));

const average4 = (arr) => {
  const sumCount = arr.reduce(
    (accum, value) => [accum[0] + value, accum[1] + 1],
    [0, 0]
  );
  console.log("sumCount tuple version is: ", sumCount);
  return sumCount[0] / sumCount[1];
};

console.log("with average4 ", average4(myArray)); // 27.166667
