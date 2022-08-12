const onceAndAfter = (f, g) => {
  let done = false;

  return (...args) => {
    if (!done) {
      done = true;
      f(...args);
    } else {
      g(...args);
    }
  };
};

const squeak = (x) => console.log(x, " squeak!!");
const creek = (x) => console.log(x, " creek!!");
const makeSound = onceAndAfter(squeak, creek);

makeSound("door");
makeSound("door");
makeSound("door");
makeSound("door");

module.exports = { onceAndAfter };
