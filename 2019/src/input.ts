import { readFile } from "fs";
import { Input } from "./types";

export default (day: string | number): Promise<Input> => {
  return new Promise((resolve, reject) => {
    readFile(`./resources/day${day}.txt`, (_err, data) => {
      const inputString = data ? data.toString() : "";

      const input: Input = {
        asString: () => inputString,
        asLines: () => inputString.split("\n"),
        asNumbers: () => inputString.split("\n").map(l => parseInt(l, 10)),
        asNumberArray: () => inputString.split(",").map(n => parseInt(n, 10))
      };
      resolve(input);
    });
  });
};
