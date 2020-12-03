import { Input } from "./input";

export const part1 = (input: Input) => {
  const trees = input.asGrid();

  return slope(trees, [3, 1]);
};

export const part2 = (input: Input) => {
  const trees = input.asGrid();

  const slopes: [number, number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes.map((s) => slope(trees, s)).reduce((acc, x) => acc * x, 1);
};

const slope = (trees: string[][], [dx, dy]: [number, number]) => {
  let total = 0;

  let t = 0;
  while (true) {
    const x = t * dx;
    const y = t * dy;
    t += 1;

    if (y >= trees.length) {
      return total;
    }

    const cell = trees[y][x % trees[y].length];

    if (cell === "#") {
      total += 1;
    }
  }
};
