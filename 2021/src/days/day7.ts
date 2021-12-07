import { Input } from "../input";

export const part1 = (input: Input) => {
  const crabs = input.asNumberArray();

  let minFuel = Number.MAX_SAFE_INTEGER;

  for (let x = Math.min(...crabs); x <= Math.max(...crabs); x++) {
    const fuel = crabs.map((c) => Math.abs(c - x)).reduce((x, y) => x + y);

    minFuel = Math.min(minFuel, fuel);
  }

  return minFuel;
};

const triangle = (x: number) => (x * (x + 1)) / 2;

export const part2 = (input: Input) => {
  const crabs = input.asNumberArray();

  let minFuel = Number.MAX_SAFE_INTEGER;

  for (let x = Math.min(...crabs); x <= Math.max(...crabs); x++) {
    const fuel = crabs
      .map((c) => triangle(Math.abs(c - x)))
      .reduce((x, y) => x + y);

    minFuel = Math.min(minFuel, fuel);
  }

  return minFuel;
};
