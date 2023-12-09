import { Input } from "../input";
import { sum } from "../utils";

const getDiffs = (values: number[]) =>
  values.slice(0, -1).map((v, i) => values[i + 1] - v);

export const part1 = (input: Input) => {
  const solve = (values: number[]): number => {
    if (values.every((v) => v === 0)) return 0;

    return values.at(-1)! + solve(getDiffs(values));
  };

  return input.asNumbers().map(solve).reduce(sum);
};

export const part2 = (input: Input) => {
  const solve = (values: number[]): number => {
    if (values.every((v) => v === 0)) return 0;

    return values.at(0)! - solve(getDiffs(values));
  };

  return input.asNumbers().map(solve).reduce(sum);
};
