const fs = require("fs");

const newLine = /\r?\n/;
const encoding = "utf-8";

const sybils = fs
  .readFileSync("sybil-addresses.txt", { encoding })
  .split(newLine);

fs.writeFileSync(
  "result.txt",
  fs
    .readFileSync("addresses.txt", { encoding })
    .split(newLine)
    .map((a) => (sybils.includes(a.toLowerCase()) ? `${a},sybil` : `${a},`))
    .join("\n"),
  { encoding }
);
