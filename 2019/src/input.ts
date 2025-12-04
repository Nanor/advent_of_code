import { readFile } from "fs";

export interface Input {
  asString(): string;
  asLines(): string[];
  asNumbers(): number[];
  asNumberArray(): number[];
  asGrid(): string[][];
  asObjects(): any[];
  asDigits(): number[];
}

export const asInput = (str: string): Input => ({
  asString: () => str,
  asLines: () => str.split("\n"),
  asNumbers: () => str.split("\n").map((l) => parseInt(l, 10)),
  asNumberArray: () => str.split(",").map((n) => parseInt(n, 10)),
  asGrid: () => str.split("\n").map((l) => l.split("")),
  asObjects: () =>
    str.split("\n").map((l) =>
      l
        .match(/\w+=[-\d]+/g)
        .map((str) => {
          const [k, v] = str.split("=");
          return { [k]: parseInt(v, 10) };
        })
        .reduce((acc: any, i: any) => ({ ...acc, ...i }), {})
    ),
  asDigits: () => str.split("").map((c) => parseInt(c, 10)),
});

export default (day: string | number): Promise<Input> => {
  return new Promise((resolve, reject) => {
    readFile(
      `../files/2019_${String(day).padStart(2, "0")}_input.txt`,
      (_err, data) => {
        const inputString = data ? data.toString().trim() : "";
        const input = asInput(inputString);

        resolve(input);
      }
    );
  });
};
