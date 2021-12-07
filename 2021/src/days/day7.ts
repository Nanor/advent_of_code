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

const triangles: number[] = [];

const triangle = (x: number): number => {
  if (!(x in triangles)) {
    let v: number;
    if (x === 0) {
      v = 0;
    } else {
      v = triangle(x - 1) + x;
    }
    triangles[x] = v;
  }

  return triangles[x];
};

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
