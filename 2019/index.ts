import { readFile } from "fs";
import { Input } from "./src/types";

const day = process.argv[2];
const code = require(`./src/day${day}.ts`);

readFile("./src/day1.txt", (_err, data) => {
  const inputString = data.toString();

  const input: Input = {
    asString: () => inputString,
    asLines: () => inputString.split("\n"),
    asNumbers: () => inputString.split("\n").map(l => parseInt(l, 10))
  };

  if ("part1" in code) {
    console.log(code.part1(input));
  }
  if ("part2" in code) {
    console.log(code.part2(input));
  }
});
