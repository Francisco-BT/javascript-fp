const isOldEnoughPure = (currentYear, birthYear) =>
  birthYear <= currentYear - 18;

console.log(isOldEnoughPure(2022, 2000));

const roundFixPure = (a, n) => {
  let r = a > 0 ? Math.ceil(n) : Math.floor(n);
  a += n - r;
  return { a, r };
};

let accum = 0;

let { a, r } = roundFixPure(accum, 3.1415);
accum = a;
console.log(accum, r); // 0.1415 3

const getRandomLetterPure = (getRandomInt = Math.random) => {
  const min = "A".charCodeAt();
  const max = "Z".charCodeAt();
  return String.fromCharCode(
    Math.floor(getRandomInt() * (1 + max - min)) + min
  );
};

const getRandomFileNamePure = (
  fileExtension = "",
  randomLetterFunc = getRandomLetterPure
) => {
  const NAME_LENGTH = 12;
  let namePart = new Array(NAME_LENGTH);
  for (let i = 0; i < NAME_LENGTH; i++) {
    namePart[i] = randomLetterFunc();
  }
  return namePart.join("") + fileExtension;
};

module.exports = {
  isOldEnoughPure,
  roundFixPure,
  getRandomLetterPure,
  getRandomFileNamePure,
};
