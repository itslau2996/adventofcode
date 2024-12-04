const fs = require("fs");
const path = require("path");

function day1part1() {
  const filePath = path.join(__dirname, "dataset.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const lines = data.split("\n");
    const result1 = [];
    const result2 = [];
    lines.forEach((line) => {
      line = line.replace(/ +(?= )/g, "");

      result1.push(line.split(" ")[0]);
      result2.push(line.split(" ")[1]);
    });
    result1.sort((a, b) => a - b);
    result2.sort((a, b) => a - b);
    const preresult = [];
    result1.forEach((element, index) => {
      preresult.push({
        num1: parseInt(element),
        num2: parseInt(result2[index]),
      });
    });
    const diff = [];
    preresult.forEach((element) => {
      const diffR = Math.abs(element.num1 - element.num2);
      diff.push(diffR);
    });
    let sum = 0;

    for (let i = 0; i < diff.length; i++) {
      sum += diff[i];
    }
    console.log(sum);
  });
}
function day1part2() {
  const filePath = path.join(__dirname, "dataset.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const lines = data.split("\n");
    const result1 = [];
    const result2 = [];
    lines.forEach((line) => {
      line = line.replace(/ +(?= )/g, "");

      result1.push(parseInt(line.split(" ")[0]));
      result2.push(parseInt(line.split(" ")[1]));
    });
    result1.sort((a, b) => a - b);
    result2.sort((a, b) => a - b);
    const preresult = [];
    result1.forEach((element) => {
      var count = 0;
      result2.forEach((v) => v === element && count++);
      preresult.push(count * element);
    });
    let sum = 0;

    // iterate over each item in the array
    for (let i = 0; i < preresult.length; i++) {
      sum += preresult[i];
    }
    console.log(sum);
  });
}

day1part1();
day1part2();
