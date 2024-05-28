const fs = require("fs");

const FILE_SYBILS = "trusta-addresses.txt";

const newLine = /\r?\n/;
const encoding = "utf-8";

const sybils = fs
  .readFileSync(FILE_SYBILS, { encoding })
  .split(newLine)
  .map((l) => l.toLocaleLowerCase());

const data = fs
  .readFileSync("my-addresses.txt", { encoding })
  .split(newLine)
  .map((a) => (sybils.includes(a.toLowerCase()) ? `${a},sybil` : `${a},`));

fs.writeFileSync("result-all.txt", data.join("\n"), { encoding });
fs.writeFileSync(
  "result-sybils.txt",
  data.filter((l) => l.endsWith("sybil")).join("\n"),
  { encoding }
);
