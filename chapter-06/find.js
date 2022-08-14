const markers = [
  { name: "UY", lat: -34.9, lon: -56.2 },
  { name: "AR", lat: -34.6, lon: -58.4 },
  { name: "BR", lat: -15.8, lon: -47.9 },
  //…
  { name: "BO", lat: -16.5, lon: -68.1 },
];

const brazilData = markers.find((v) => v.name === "BR");
console.log("brazilData using find: ", brazilData);

const brazilIndex = markers.findIndex((marker) => marker.name === "BR");
console.log("brazil index: ", brazilIndex);
const mexicoIndex = markers.findIndex((marker) => marker.name === "MX");
console.log("mexico index: ", mexicoIndex);

const myFind = (arr, fn) => arr.reduce((a, b) => (fn(b) ? b : a), undefined);

console.log(
  "brazilData using myFind: ",
  myFind(markers, (v) => v.name === "BR")
);

console.log(
  "mexicoData using myFind: ",
  myFind(markers, (v) => v.name === "MX")
);

const myFindIndex = (arr, fn) =>
  arr.reduce((x, y, index) => (fn(y) ? index : x), -1);

console.log(
  "brazilIndex using myFindIndex: ",
  myFindIndex(markers, (v) => v.name === "BR")
);

console.log(
  "mexicoIndex using myFindindex: ",
  myFindIndex(markers, (v) => v.name === "MX")
);
