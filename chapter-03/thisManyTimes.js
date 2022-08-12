const thisManyTimes = (fn, limit) => {
  return (...args) => {
    if (limit > 0) {
      limit--;
      fn(...args);
    }
  };
};

const sayA = () => console.log("A");
const sayAOneTime = thisManyTimes(sayA, 1);

sayAOneTime();
sayAOneTime();

const sayB = () => console.log("B");
const sayBThreeTimes = thisManyTimes(sayB, 3);

sayBThreeTimes();
sayBThreeTimes();
sayBThreeTimes();
sayBThreeTimes();
sayBThreeTimes();
sayBThreeTimes();

module.exports = { thisManyTimes };
