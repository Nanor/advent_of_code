export const part1 = (input: Input) =>
  Math.max(
    ...input
      .asParagraphs()
      .map((elf) => elf.reduce((acc, item) => acc + parseInt(item), 0))
  );

export const part2 = (input: Input) => {
  const calories = input
    .asParagraphs()
    .map((elf) => elf.reduce((acc, item) => acc + parseInt(item), 0));

  calories.sort((a, b) => b - a);

  return calories.slice(0, 3).reduce((a, x) => a + x, 0);
};
