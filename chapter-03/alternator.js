const alternator = (f, g) => {
  let current = 0;
  return (...args) => {
    if (current % 2 === 0) {
      f(...args);
    } else {
      g(...args);
    }
    current += 1;
  };
};

const sayA = () => console.log("A");
const sayB = () => console.log("B");
const alt = alternator(sayA, sayB);

alt();
alt();
alt();
alt();

module.exports = { alternator };
