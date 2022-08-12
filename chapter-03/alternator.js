const alternator = (f1, f2) => {
  return (...args) => {
    f1(...args);
    [f1, f2] = [f2, f1];
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
