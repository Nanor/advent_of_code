export const asInput = (str: string) => ({
  asString: () => str,
  asLines: () =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
  asGrid: () =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split("")),
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
});

export type Input = ReturnType<typeof asInput>;

export default async (name: string): Promise<Input> => {
  const file = Bun.file(`./inputs/day${name}.txt`);
  return asInput(await file.text());
};
