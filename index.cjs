const fs = require("fs");

const newLine = /\r?\n/;
const encoding = "utf-8";

const sybils = fs
  .readFileSync("sybil-addresses.txt", { encoding })
  .split(newLine);

const data = fs
  .readFileSync("addresses.txt", { encoding })
  .split(newLine)
  .map((a) => (sybils.includes(a.toLowerCase()) ? `${a},sybil` : `${a},`));

fs.writeFileSync("all.txt", data.join("\n"), { encoding });
fs.writeFileSync(
  "sybils.txt",
  data.filter((l) => l.endsWith("sybil")).join("\n"),
  { encoding }
);
