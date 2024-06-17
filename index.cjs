const fs = require("fs");

const encoding = "utf-8";

const read = (name) => fs.readFileSync(name, { encoding }).split(/\r?\n/);
const append = (name, line) =>
  fs.appendFileSync(name, `${line}\n`, { encoding });
const write = (name, data) => fs.writeFileSync(name, data, { encoding });

const normalizeAddress = (a) => a.trim().toLocaleLowerCase();

write("result.txt", "");
write("sybils.txt", "");

const addresses = read("addresses.txt").map(normalizeAddress);
const sybils = read("provisionalSybilList.csv").map((line) => {
  const splitted = line.split(",");
  if (splitted.length !== 3) return { url: "", cluster: "", address: "" };
  return {
    url: splitted[0],
    cluster: splitted[1],
    address: normalizeAddress(splitted[2]),
  };
});

let idx = 0;
let nextLog = 10;
let sybilsCount = 0;

for (const address of addresses) {
  const reports = [];

  for (const sybil of sybils) {
    if (sybil.address === address) {
      reports.push(`${sybil.url} , ${sybil.cluster}`);
    }
  }

  if (reports.length) {
    append("result.txt", `${address} - ${reports.join(" | ")}`);
    append("sybils.txt", `${address}\n\n${reports.join("\n")}\n\n---\n`);

    sybilsCount += 1;
  } else {
    append("result.txt", `${address},not sybil`);
  }

  idx += 1;

  const progress = (idx / addresses.length) * 100;
  if (progress >= nextLog) {
    console.log(`${nextLog}%`);
    nextLog += 10;
  }
}

if (!sybilsCount) write("sybils.txt", "no sybils");

console.log(`sybils: ${sybilsCount}`);
