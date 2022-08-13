let limitYear = 1999;

// Using global state;
const isOldEnough = (birthYear) => birthYear <= limitYear;

console.log(isOldEnough(1960));
console.log(isOldEnough(2001));

const PI = Math.PI;
// PURE: pi is a constant so the functions returns the save value between calls
const circleArea = (r) => PI * Math.pow(r, 2);

// SIDE EFFECTS using INNER STATE
const roundFix = (function () {
  let accum = 0;
  return (n) => {
    // reals get rounded up or down
    // depending on the sign of accum
    let nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
    console.log("accum", accum.toFixed(5), " result", nRounded);
    accum += n - nRounded;
    return nRounded;
  };
})();

roundFix(3.14159); // accum  0.00000    result 3
roundFix(2.71828); // accum  0.14159    result 3
roundFix(2.71828); // accum -0.14013    result 2
roundFix(3.14159); // accum  0.57815    result 4
roundFix(2.71828); // accum -0.28026    result 2
roundFix(2.71828); // accum  0.43802    result 3
roundFix(2.71828); // accum  0.15630    result 3

// ARGUMENT MUTATION
const maxStrings = (a) => a.sort().pop();

let countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];
console.log(maxStrings(countries)); // "Uruguay"

// TROUBLESOME FUNCTIONS
const getRandomLetter = () => {
  const min = "A".charCodeAt();
  const max = "Z".charCodeAt();
  return String.fromCharCode(Math.floor(Math.random() * (1 + max - min)) + min);
};

const getRandomFileName = (fileExtension = "") => {
  const NAME_LENGTH = 12;
  let namePart = new Array(NAME_LENGTH);
  for (let i = 0; i < NAME_LENGTH; i++) {
    namePart[i] = getRandomLetter();
  }
  return namePart.join("") + fileExtension;
};

console.log(getRandomFileName(".pdf")); // "SVHSSKHXPQKG.pdf"
console.log(getRandomFileName(".pdf")); // "DCHKTMNWFHYZ.pdf"
console.log(getRandomFileName(".pdf")); // "GBTEFTVVHADO.pdf"
console.log(getRandomFileName(".pdf")); // "ATCBVUOSXLXW.pdf"
console.log(getRandomFileName(".pdf")); // "OIFADZKKNVAH.pdf"

module.exports = {
  getRandomLetter,
};
