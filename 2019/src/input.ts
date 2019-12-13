import { readFile } from "fs";

export interface Input {
  asString(): String;
  asLines(): String[];
  asNumbers(): number[];
  asNumberArray(): number[];
  asGrid(): String[][];
  asObjects(): any[];
}

export const asInput = (str: string): Input => ({
  asString: () => str,
  asLines: () => str.split("\n"),
  asNumbers: () => str.split("\n").map(l => parseInt(l, 10)),
  asNumberArray: () => str.split(",").map(n => parseInt(n, 10)),
  asGrid: () => str.split("\n").map(l => l.split("")),
  asObjects: () =>
    str.split("\n").map(l =>
      l
        .match(/\w+=[-\d]+/g)
        .map(str => {
          const [k, v] = str.split("=");
          return { [k]: parseInt(v, 10) };
        })
        .reduce((acc: any, i: any) => ({ ...acc, ...i }), {})
    )
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
