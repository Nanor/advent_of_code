export const asInput = (str: string) => ({
  asString: () => str,
  asLines: () =>
    str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
});

export type Input = ReturnType<typeof asInput>;

export default async (name: string): Promise<Input> => {
  const file = Bun.file(`./inputs/day${name}.txt`);
  return asInput(await file.text());
};
