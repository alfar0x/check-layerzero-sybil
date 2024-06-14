const fs = require("fs");

const newLine = /\r?\n/;
const encoding = "utf-8";

const sybils = fs
  .readFileSync("sybils.txt", { encoding })
  .split(newLine)
  .map((l) => l.toLocaleLowerCase());

const data = fs
  .readFileSync("addresses.txt", { encoding })
  .split(newLine)
  .map((l) => l.toLocaleLowerCase())
  .map((a) => (sybils.includes(a) ? `${a},sybil` : a));

fs.writeFileSync("result.txt", data.join("\n"), { encoding });

let count = data.filter((l) => l.endsWith("sybil")).length;

console.log(`sybils: ${count}`);
