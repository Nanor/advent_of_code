import { Input } from "./input";

export const part1 = (input: Input) => {
  const passwords = input.asLines().map((l) => {
    const [_, min, max, letter, word] = l.match(/(\d+)-(\d+) (\w): (\w+)/);
    return { min: parseInt(min), max: parseInt(max), letter, word };
  });

  return passwords.filter(({ min, max, letter, word }) => {
    const count = word.split("").filter((c) => c === letter).length;

    return min <= count && count <= max;
  }).length;
};

export const part2 = (input: Input) => {
  const passwords = input.asLines().map((l) => {
    const [_, a, b, letter, word] = l.match(/(\d+)-(\d+) (\w): (\w+)/);
    return { a: parseInt(a), b: parseInt(b), letter, word };
  });

  return passwords.filter(
    ({ a, b, letter, word }) =>
      (word[a - 1] === letter) !== (word[b - 1] === letter)
  ).length;
};
