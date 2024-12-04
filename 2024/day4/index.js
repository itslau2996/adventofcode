// Stole this one, did not quite understand at that point

const fs = require("fs");

const input = fs.readFileSync(__dirname + "/dataset.txt", "utf8");

const parseInput = (rawInput) =>
  rawInput.split(/\r?\n/).map((row) => row.split(""));

const data = parseInput(input);
const rows = data.length;
const cols = data[0].length;

// Directions for part 1
const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];

// Check for XMAS in part 1
const checkWord = (x, y, dx, dy, grid, word) => {
  for (let i = 0; i < word.length; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (
      nx < 0 ||
      ny < 0 ||
      nx >= rows ||
      ny >= cols ||
      grid[ny][nx] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};

// Part 1: Count all occurrences of "XMAS"
const part1 = (grid) => {
  let count = 0;
  const word = "XMAS";

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const [dx, dy] of directions) {
        if (checkWord(x, y, dx, dy, grid, word)) count++;
      }
    }
  }
  return count;
};

// Part 2: Count all "X-MAS" patterns
const part2 = (grid) => {
  let count = 0;
  for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < cols - 1; y++) {
      if (grid[x][y] === "A") {
        const tlbr =
          (grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
          (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M");
        const trbl =
          (grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S") ||
          (grid[x - 1][y + 1] === "S" && grid[x + 1][y - 1] === "M");
        if (tlbr && trbl) count++;
      }
    }
  }
  return count;
};

console.time("Part 1 Time");
console.log("Part 1:", part1(data));
console.timeEnd("Part 1 Time");

console.time("Part 2 Time");
console.log("Part 2:", part2(data));
console.timeEnd("Part 2 Time");
