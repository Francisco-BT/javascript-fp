const myString = "MONTEVIEDO";

const reverseString = (str) => {
  let arr = str.split("");
  arr.reverse();
  return arr.join("");
};

console.log("reverseString: ", reverseString(myString));

const reverseString2 = (str) => str.split("").reduceRight((x, y) => x + y, "");
console.log("reverseString2: ", reverseString2(myString));

const reverseString3 = (str) => str.split("").reduce((x, y) => y + x, "");
console.log("reverseString3: ", reverseString3(myString));
