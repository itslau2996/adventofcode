// Took inspiration from a python solution i saw, after being wayy to asleep to do this challenge

const fs = require("fs");

const input = fs.readFileSync(__dirname + "/dataset.txt", "utf8");
const data = input.split("\n\n");

function part1(data) {
  const rules = data[0].split("\n").map((e) => e.split("|").map(Number));
  const pages = data[1].split("\n").map((e) => e.split(",").map(Number));

  let sum = 0;

  for (let row of pages) {
    const valid = rules.every(([l, r]) => {
      return (
        !row.includes(l) || !row.includes(r) || row.indexOf(l) < row.indexOf(r)
      );
    });
    if (valid) {
      sum += row[Math.floor(row.length / 2)];
    }
  }
  return sum;
}
function part2(data) {
  const rules = data[0].split("\n").map((e) => e.split("|").map(Number));
  const pages = data[1].split("\n").map((e) => e.split(",").map(Number));
  function order(a, b) {
    for (let [l, r] of rules) {
      if (a === r && b === l) {
        return 1; // If a should follow b
      } else if (a === l && b === r) {
        return -1; // If a should precede b
      }
    }
    return 0; // No specific order
  }

  let sum = 0;

  for (let row of pages) {
    const valid = rules.every(([l, r]) => {
      return (
        !row.includes(l) || !row.includes(r) || row.indexOf(l) < row.indexOf(r)
      );
    });
    if (valid) {
      continue;
    } else {
      const corrected = [...row].sort((a, b) => order(a, b));
      sum += corrected[Math.floor(corrected.length / 2)];
    }
  }
  return sum;
}
console.time("Part 1 Time");
console.log("Part 1:", part1(data));
console.timeEnd("Part 1 Time");

console.time("Part 2 Time");
console.log("Part 2:", part2(data));
console.timeEnd("Part 2 Time");
