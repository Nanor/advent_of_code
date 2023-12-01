export const asInput = (str: string) => ({
  asString: () => str,
});

export type Input = ReturnType<typeof asInput>;

export default async (name: string): Promise<Input> => {
  const file = Bun.file(`./inputs/day${name}.txt`);
  return asInput(await file.text());
};
