import { readFile } from "fs";
import { Input } from "./types";

export const asInput = (str: string): Input => ({
  asString: () => str,
  asLines: () => str.split("\n"),
  asNumbers: () => str.split("\n").map(l => parseInt(l, 10)),
  asNumberArray: () => str.split(",").map(n => parseInt(n, 10)),
  asGrid: () => str.split("\n").map(l => l.split(""))
});

export default (day: string | number): Promise<Input> => {
  return new Promise((resolve, reject) => {
    readFile(`./resources/day${day}.txt`, (_err, data) => {
      const inputString = data ? data.toString() : "";
      const input = asInput(inputString);

      resolve(input);
    });
  });
};
