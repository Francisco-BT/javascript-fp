const markers = [
  { name: "UY", lat: -34.9, lon: -56.2 },
  { name: "AR", lat: -34.6, lon: -58.4 },
  { name: "BR", lat: -15.8, lon: -47.9 },
  //…
  { name: "BO", lat: -16.5, lon: -68.1 },
];

console.log(
  "every: ",
  markers.every((v) => v.lat < 0 && v.lon < 0)
);

console.log(
  "some: ",
  markers.some((v) => v.lat < 0 && v.lon < 0)
);

const myEvery = (arr, fn) => arr.reduce((x, y) => x && fn(y), true);
const mySome = (arr, fn) => arr.reduce((x, y) => x || fn(y), false);

console.log(
  "myEvery: ",
  myEvery(markers, (v) => v.lat < 0 && v.lon < 0)
);

console.log(
  "some: ",
  mySome(markers, (v) => v.lat < 0 && v.lon < 0)
);
