const fs = require("fs");
const path = require("path");
function part2() {
  // AI only for regex bcuz im waaayy to stupid for regex
  function useRegex(input) {
    const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;

    var newClass = input.match(regex);
    return newClass;
  }
  const filePath = path.join(__dirname, "dataset.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    const output = useRegex(data);
    let sum = 0;
    let state = true;
    output.forEach((element) => {
      if (element.match(/don't\(\)/)) {
        state = false;
      }
      if (element.match(/do\(\)/)) {
        state = true;
      }
      if (state && element.match(/mul\(\d+,\d+\)/g)) {
        element = element
          .replace("mul", "")
          .replace("(", "")
          .replace(")", "")
          .split(",")
          .map((o) => parseInt(o));
        sum += element[0] * element[1];
      }
    });
    console.log("part 2: ", sum);
  });
}
function part1() {
  // AI only for regex bcuz im waaayy to stupid for regex
  function useRegex(input) {
    const regex = /mul\(\d+,\d+\)/g;
    var newClass = input.match(regex);
    return newClass;
  }
  const filePath = path.join(__dirname, "dataset.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    let output = useRegex(data);
    output = output.map((o) => {
      o = o
        .replace("mul", "")
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map((o) => parseInt(o));
      return o[0] * o[1];
    });
    let sum = 0;
    output.forEach((element) => {
      sum += element;
    });
    console.log("part 1: ", sum);
  });
}
part1();
part2();
