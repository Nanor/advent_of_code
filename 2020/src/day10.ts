import { Input } from "./input";

const getDiffs = (input: Input) => {
  const adapters = input.asNumbers().sort((a, b) => a - b);

  const diffs = adapters.map((j, i) => j - (adapters[i - 1] || 0));
  diffs.push(3);

  return diffs;
};

export const part1 = (input: Input) => {
  const diffs = getDiffs(input);
  return (
    diffs.filter((x) => x === 1).length * diffs.filter((x) => x === 3).length
  );
};

export const part2 = (input: Input) => {
  const diffs = getDiffs(input);

  const runs = diffs.reduce(
    (acc, x) => {
      if (x === 3) {
        return [...acc, 0];
      } else if (x === 1) {
        acc[acc.length - 1] += 1;
        return acc;
      } else {
        throw Error(`${x}`);
      }
    },
    [0]
  );

  const combinations = runs.map(
    (x) =>
      ({
        0: 1,
        1: 1,
        2: 2,
        3: 4,
        4: 7,
      }[x])
  );

  return combinations.reduce((x, y) => x * y, 1);
};
