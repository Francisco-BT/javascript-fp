const average = (arr) => arr.reduce((x, y) => x + y, 0);

const markers = [
  { name: "AR", lat: -34.6, lon: -58.4 },
  { name: "BO", lat: -16.5, lon: -68.1 },
  { name: "BR", lat: -15.8, lon: -47.9 },
  { name: "CL", lat: -33.4, lon: -70.7 },
  { name: "CO", lat: 4.6, lon: -74.0 },
  { name: "EC", lat: -0.3, lon: -78.6 },
  { name: "PE", lat: -12.0, lon: -77.0 },
  { name: "PY", lat: -25.2, lon: -57.5 },
  { name: "UY", lat: -34.9, lon: -56.2 },
  { name: "VE", lat: 10.5, lon: -66.9 },
];

const averageLatitude = average(markers.map((marker) => marker.lat));
const averageLongitude = average(markers.map((marker) => marker.lon));
console.log("average latitude: ", averageLatitude);
console.log("average longitude: ", averageLongitude);

const range = (start, stop) =>
  new Array(stop - start).fill(0).map((_, i) => start + i);

const from2To6 = range(2, 6);
console.log("range [2,6]: ", from2To6);

const factorialByRange = (n) => range(1, n + 1).reduce((x, y) => x * y, 1);
console.log("5!: ", factorialByRange(5));
console.log("3!: ", factorialByRange(3));

const ALPHABET = range("A".charCodeAt(0), "Z".charCodeAt(0) + 1).map((code) =>
  String.fromCharCode(code)
);

console.log("Generated ALPHABET: ", ALPHABET);

const myMap = (arr, fn) => arr.reduce((x, y) => x.concat(fn(y)), []);
const myArray = [22, 9, 60, 12, 4, 56];
const dup = (x) => x * 2;

console.log("my original array: ", myArray);
console.log("native map: ", myArray.map(dup));
console.log("my own map: ", myMap(myArray, dup));
