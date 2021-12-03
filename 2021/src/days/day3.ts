import { Input } from "../input";

export const part1 = (input: Input) => {
  const grid = input.asGrid();

  const totals = grid.reduce(
    (acc, x) => {
      return acc.map((c, i) => c + parseInt(x[i], 10));
    },
    grid[0].map(() => 0)
  );

  const gamma = parseInt(
    totals.map((x) => (x > grid.length / 2 ? "1" : "0")).join(""),
    2
  );
  const epsilon = parseInt(
    totals.map((x) => (x < grid.length / 2 ? "1" : "0")).join(""),
    2
  );

  return gamma * epsilon;
};

export const part2 = (input: Input) => {
  let grid = input.asGrid();
  let bit = 0;

  while (grid.length > 1) {
    const count = grid.filter((l) => l[bit] === "1").length;

    const val = count >= grid.length / 2 ? "1" : "0";

    grid = grid.filter((l) => l[bit] === val);

    bit += 1;
  }

  const oxygen = parseInt(grid[0].join(""), 2);

  grid = input.asGrid();
  bit = 0;

  while (grid.length > 1) {
    const count = grid.filter((l) => l[bit] === "1").length;

    const val = count >= grid.length / 2 ? "1" : "0";

    grid = grid.filter((l) => l[bit] !== val);

    bit += 1;
  }

  const carbon = parseInt(grid[0].join(""), 2);

  return oxygen * carbon;
};
