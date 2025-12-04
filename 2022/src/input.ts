import { readFile } from "fs";

export const asInput = (str: string) => ({
  asString: () => str,
  asLines: () => str.split("\n").filter(Boolean),
  asInts: () =>
    str
      .split("\n")
      .filter(Boolean)
      .map((n) => parseInt(n, 10)),
  asGrid: () => str.split("\n").map((l) => l.split("")),
  asNumberGrid: () =>
    str.split("\n").map((l) => l.split("").map((d) => parseInt(d, 10))),
  asChars: () => str.split(""),
  asDigits: () => str.split("").map((c) => parseInt(c, 10)),
  asParagraphs: () =>
    str
      .split("\n\n")
      .map((p) => p.split("\n").filter(Boolean))
      .filter((p) => p.length > 0),
  asMatches: (regex: RegExp) => Array.from(str.matchAll(regex)),
  asMatchGroups: (regex: RegExp) =>
    Array.from(str.matchAll(regex)).map((r) => r.groups),
  asNumbers: () =>
    str
      .split("\n")
      .filter(Boolean)
      .map((n) => parseInt(n)),
  asNumberArrays: () =>
    str
      .split("\n")
      .filter(Boolean)
      .map((l) => l.split(",").map((n) => parseInt(n))),
});

export type Input = ReturnType<typeof asInput>;

export default (name: string): Promise<Input> => {
  return new Promise((resolve, reject) => {
    readFile(
      `../files/2022_${String(name).padStart(2, "0")}_input.txt`,
      (_err, data) => {
        const inputString = data ? data.toString().trim() : "";
        const input = asInput(inputString);

        resolve(input);
      }
    );
  });
};
