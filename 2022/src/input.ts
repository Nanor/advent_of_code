import { readFile } from "fs";

export interface Input {
  asString(): string;
  asLines(): string[];
  asNumbers(): number[];
  asNumberArray(): number[];
  asGrid(): string[][];
  asNumberGrid(): number[][];
  asObjects(): any[];
  asDigits(): number[];
  asParagraphs(): string[][];
}

export const asInput = (str: string): Input => ({
  asString: () => str,
  asLines: () => str.split("\n"),
  asNumbers: () => str.split("\n").map((l) => parseInt(l, 10)),
  asNumberArray: () => str.split(",").map((n) => parseInt(n, 10)),
  asGrid: () => str.split("\n").map((l) => l.split("")),
  asNumberGrid: () =>
    str.split("\n").map((l) => l.split("").map((d) => parseInt(d, 10))),
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
  asParagraphs: () => str.split("\n\n").map((p) => p.split("\n")),
});

export default (name: string): Promise<Input> => {
  return new Promise((resolve, reject) => {
    readFile(`./resources/${name}.txt`, (_err, data) => {
      const inputString = data ? data.toString() : "";
      const input = asInput(inputString);

      resolve(input);
    });
  });
};
