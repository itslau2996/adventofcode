const { getEventListeners } = require("events");
const fs = require("fs");
const path = require("path");

function isSafeSequence(levels) {
  const isIncreasing = levels[1] > levels[0];

  for (let i = 1; i < levels.length; i++) {
    const difference = levels[i] - levels[i - 1];
    if (difference === 0 || Math.abs(difference) > 3) {
      return false;
    }
    if ((isIncreasing && difference < 0) || (!isIncreasing && difference > 0)) {
      return false;
    }
  }
  return true;
}

function canBeMadeSafe(levels) {
  if (isSafeSequence(levels)) return true;

  for (let i = 0; i < levels.length; i++) {
    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isSafeSequence(modifiedLevels)) {
      return true;
    }
  }
  return false;
}

function day2part2() {
  const filePath = path.join(__dirname, "dataset.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const lines = data.split("\n");
    const objects = [];
    lines.forEach((l) => {
      l = l.replace(/ +(?= )/g, "");
      let splitted = l.split(" ");
      objects.push(splitted.map((e) => parseInt(e)));
    });
    let trues = 0;

    for (const levels of objects) {
      if (canBeMadeSafe(levels)) {
        trues++;
      }
    }

    console.log(trues);
    console.log(lines.length);
    console.log(objects.length);
  });
}

day2part2();
