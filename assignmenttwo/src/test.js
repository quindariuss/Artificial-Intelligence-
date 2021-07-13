const data = require("./bob.json");
const fs = require("fs");
var citydata = [];

console.log(data[0].city);

data.forEach((cit) => {
  citydata.push({ city: cit.city, x: cit.longitude + 180, y: cit.latitude });
});

console.log(JSON.stringify(citydata));

writefile(
  "/Volumes/Untitled/Users/quin/Documents/GeneticAlgorithm-TSP/src/json.js",
  JSON.stringify(citydata)
);

function writefile(file, content) {
  fs.writeFile(file, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("success");
  });
}
