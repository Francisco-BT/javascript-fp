const {
  pipeline,
  getDir,
  filterOdt,
  count,
  pipeline2,
  pipeline3,
  tee,
  tee2,
  tee3,
} = require("./pipelining");

const { City, chainify } = require("./chaining");

// console.log(
//   "count using pipeline: ",
//   pipeline(getDir, filterOdt, count)("/Users/fbernabe/Documents/")
// );

// console.log(
//   "with pipeline2: ",
//   pipeline2(getDir, filterOdt, count)("/Users/fbernabe/Documents")
// );

// console.log(
//   "with pipeline3: ",
//   pipeline3(getDir, filterOdt, count)("/Users/fbernabe/Documents")
// );

// console.log("pipeline with tee interception: ");
// pipeline2(getDir, tee, filterOdt, tee, count)("/Users/fbernabe/Documents");
// pipeline2(getDir, tee2, filterOdt, tee2, count)("/Users/fbernabe/Documents");

console.log(
  "pipeline using tap3: ",
  pipeline(getDir, tee3, count)("/Users/fbernabe/Documents")
);

let myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
myCity = chainify(myCity);
console.log(
  myCity.setName("Pune, India").setLat(18.5626).setLong(73.8087).getCoords(),
  myCity.getName()
);
