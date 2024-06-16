const fs = require("fs");

const encoding = "utf-8";

const readFile = (name) => fs.readFileSync(name, { encoding }).split(/\r?\n/);
const normalizeAddress = (a) => a.trim().toLocaleLowerCase();

const addresses = readFile("addresses.txt").map(normalizeAddress);
const sybils = readFile("provisionalSybilList.csv");

const found = {};

for (const sybil of sybils) {
  const splitted = sybil.split(",");
  if (splitted.length !== 3) continue;
  const lowerAddress = normalizeAddress(splitted[2]);
  if (!addresses.includes(lowerAddress)) continue;
  if (!found[lowerAddress]) found[lowerAddress] = [];
  found[lowerAddress].push([splitted[0], splitted[1]].join(" , "));
}

const result = addresses
  .map((a) => (found[a] ? [a, found[a].join(" | ")].join(" - ") : a))
  .join("\n");

fs.writeFileSync("result.txt", result, { encoding });

const sybilsResult = Object.keys(found)
  .map((a) => `${a}\n${found[a].join("\n")}`)
  .join("\n\n----\n\n");

fs.writeFileSync("sybils.txt", sybilsResult);

console.log(`sybils: ${Object.keys(found).length}`);
