const fs = require("fs");

const newLine = /\r?\n/;
const encoding = "utf-8";

const sybils = fs
  .readFileSync("provisionalSybilList.csv", { encoding })
  .split(newLine)
  .map((line) => line.split(","));

let count = 0;

const data = fs
  .readFileSync("addresses.txt", { encoding })
  .split(newLine)
  .map((address) => {
    const lower = address.toLocaleLowerCase();
    const sybil = sybils.find((s) => s[2] === lower);
    if (!sybil) return address;
    count += 1;
    const [source, cluster] = sybil;
    return [address, cluster, source].join(",");
  });

fs.writeFileSync("result.txt", data.join("\n"), { encoding });

console.log(`sybils: ${count}`);
