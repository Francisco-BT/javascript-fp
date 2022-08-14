const characters = [
  { name: "Fred", plays: "bowling" },
  { name: "Barney", plays: "chess" },
  { name: "Wilma", plays: "bridge" },
  { name: "Betty", plays: "checkers" },
  { name: "Pebbles", plays: "chess" },
];

const names = characters
  .filter(
    (character) => character.plays === "chess" || character.plays === "checkers"
  )
  .map((c) => `<li>${c.name}</li>`);
const html = ["<div>", "<ul>", ...names, "</div>", "</ul>"].reduce(
  (a, b) => `${a + b}\n`,
  ""
);
console.log("html is: ", html);

const range2 = (start, stop, step = Math.sign(stop - start)) =>
  new Array(Math.ceil((stop - start) / step))
    .fill(0)
    .map((v, i) => start + i * step);

console.log(range2(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(range2(1, 10, 2)); // [1, 3, 5, 7, 9]
console.log(range2(1, 10, 3)); // [1, 4, 7]
console.log(range2(1, 10, 6)); // [1, 7]
console.log(range2(1, 10, 11)); // [1]

console.log(range2(21, 10)); // [21, 20, 19, ... 13, 12, 11]
console.log(range2(21, 10, -3)); // [21, 18, 15, 12]
console.log(range2(21, 10, -4)); // [21, 17, 13]
console.log(range2(21, 10, -7)); // [21, 14]
console.log(range2(21, 10, -12)); // [21]

const myData = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const dataToCsv = (arr) =>
  arr.map((data) => data.join(",")).reduce((a, b) => `${a}\n${b}`, "");
const myCsv = dataToCsv(myData);
console.log("my csv: ", myCsv);

// 5.8 better output
const apiAnswer = [
  {
    country: "AR",
    name: "Argentine",
    states: [
      {
        state: "1",
        name: "Buenos Aires",
        cities: [{ city: 3846864, name: "Lincoln" }],
      },
    ],
  },
  {
    country: "GB",
    name: "Great Britain",
    states: [
      {
        state: "ENG",
        name: "England",
        cities: [{ city: 2644487, name: "Lincoln" }],
      },
    ],
  },
  {
    country: "US",
    name: "United States of America",
    states: [
      {
        state: "CA",
        name: "California",
        cities: [{ city: 5072006, name: "Lincoln" }],
      },
      {
        state: "IL",
        name: "Illinois",
        cities: [
          { city: 4899911, name: "Lincoln Park" },
          { city: 4899966, name: "Lincoln Square" },
        ],
      },
    ],
  },
];

const citiesFlatMap = apiAnswer
  .flatMap((c) => c.states.map((s) => ({ ...s, country: c.name })))
  .flatMap((s) =>
    s.cities.map((c) => ({ ...c, state: s.name, country: s.country }))
  )
  .map((data) => `${data.name} ${data.state} ${data.country}`);

console.log(citiesFlatMap);

// 5.9. Old-style code only!
const gettysburg = [
  "Four score and seven years ago our fathers brought forth, ",
  "on this continent, a new nation, conceived in liberty, and ",
  "dedicated to the proposition that all men are created equal.",
  "Now we are engaged in a great civil war, testing whether that ",
  "nation, or any nation so conceived and so dedicated, can long ",
  "endure.",
  "We are met on a great battle field of that war.",
  "We have come to dedicate a portion of that field, as a final ",
  "resting place for those who here gave their lives, that that ",
  "nation might live.",
  "It is altogether fitting and proper that we should do this.",
  "But, in a larger sense, we cannot dedicate, we cannot consecrate, ",
  "we cannot hallow, this ground.",
  "The brave men, living and dead, who struggled here, have ",
  "consecrated it far above our poor power to add or detract.",
  "The world will little note nor long remember what we say here, ",
  "but it can never forget what they did here.",
  "It is for us the living, rather, to be dedicated here to the ",
  "unfinished work which they who fought here have thus far so nobly ",
  "advanced.",
  "It is rather for us to be here dedicated to the great task ",
  "remaining before us— that from these honored dead we take increased ",
  "devotion to that cause for which they here gave the last full ",
  "measure of devotion— that we here highly resolve that these dead ",
  "shall not have died in vain— that this nation, under God, shall have ",
  "a new birth of freedom- and that government of the people, by the ",
  "people, for the people, shall not perish from the earth.",
];

const wordCounting = (arr) => {
  let totalWords = 0;
  for (let i = 0; i < arr.length; i++) {
    const words = arr[i].split(" ").length;
    totalWords += words;
  }
  return totalWords;
};

console.log("totalWords: ", wordCounting(gettysburg));
console.log(gettysburg.join(" ").split(" ").length);
