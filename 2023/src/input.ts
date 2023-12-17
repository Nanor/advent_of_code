import { Grid } from "./grid";

export const asInput = (str: string) => ({
  asString: () => str.trim(),
  asLines: () =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
  asCharGrid: () =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split("")),
  asNumberGrid: (): number[][] =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split("").map((d) => parseInt(d))),
  asGrid: () => new Grid(str),
  asParagraphs: () =>
    str
      .split("\n\n")
      .map((p) =>
        p
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
      )
      .filter((p) => p.length),
  asNumbers: () =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split(" ").map((d) => parseInt(d))),
});

export type Input = ReturnType<typeof asInput>;

export default async (name: string): Promise<Input> => {
  const file = Bun.file(`./inputs/day${name}.txt`);
  return asInput(await file.text());
};
