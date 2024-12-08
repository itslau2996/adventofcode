import fs from "fs";

const input = fs.readFileSync(__dirname + "/dataset.txt", "utf8");
const data: string[][] = input.split("\n").map((d) => d.split(""));
let newGrid = data;

type Direction = "n" | "s" | "w" | "e";

function part1(data: string[][]) {
  function stepper(
    direction: Direction,
    cellIndex: number,
    rowIndex: number
  ): { dir: Direction; stt: boolean } {
    newGrid[rowIndex][cellIndex] = "X";

    switch (direction) {
      case "n":
        return {
          dir: data[rowIndex - 1]?.[cellIndex] === "#" ? "e" : "n",
          stt: rowIndex - 1 < 0,
        };
      case "e":
        return {
          dir: data[rowIndex]?.[cellIndex + 1] === "#" ? "s" : "e",
          stt: cellIndex + 1 >= data[rowIndex].length,
        };
      case "s":
        return {
          dir: data[rowIndex + 1]?.[cellIndex] === "#" ? "w" : "s",
          stt: rowIndex + 1 >= data.length,
        };
      case "w":
        return {
          dir: data[rowIndex]?.[cellIndex - 1] === "#" ? "n" : "w",
          stt: cellIndex - 1 < 0,
        };
      default:
        throw new Error("Expected direction");
    }
  }
  let direction: Direction = "n";
  const startPosition = data.findIndex((row) => row.includes("^"));
  if (startPosition === -1) throw new Error("Starting position not found");

  let rowIndex = startPosition;
  let cellIndex = data[rowIndex].indexOf("^");
  console.log(cellIndex, rowIndex);

  while (true) {
    let stepp = stepper(direction, cellIndex, rowIndex);
    if (stepp.stt) {
      var count = 0;
      newGrid.forEach((e) => e.forEach((e) => (e === "X" ? count++ : null)));
      const gridText = newGrid.map((row) => row.join("")).join("\n"); // Join rows with no separator, add newlines

      // Write the text to a file
      fs.writeFileSync(__dirname + "/output.txt", gridText, "utf8"); // Save the file
      return count;
    }
    direction = stepp.dir;
    switch (direction) {
      case "n":
        rowIndex--;
        break;
      case "e":
        cellIndex++;
        break;
      case "s":
        rowIndex++;
        break;
      case "w":
        cellIndex--;
        break;
    }
  }
}
function part2(data: string[][]) {
  return "Did not complete yet";
}
console.time("Part 1 Time");
console.log("Part 1:", part1(data));
console.timeEnd("Part 1 Time");

console.time("Part 2 Time");
console.log("Part 2:", part2(data));
console.timeEnd("Part 2 Time");

const width = data[0].length;
const height = data.length;
