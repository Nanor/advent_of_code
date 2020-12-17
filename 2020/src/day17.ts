import { Input } from "./input";

const search = ([f, ...rest]: number[]): number[][] => {
  if (rest.length === 0) {
    return [[f - 1], [f], [f + 1]];
  }

  const out = [];

  for (let i = -1; i <= 1; i++) {
    out.push(...search(rest).map((xs) => [f + i, ...xs]));
  }

  return out;
};

const count = (grid: Set<String>, coord: number[]): number => {
  let total = 0;

  search(coord).forEach((nc) => {
    const newCoord = nc.join(",");
    if (coord.join(",") !== newCoord) {
      if (grid.has(newCoord)) {
        total += 1;
      }
    }
  });

  return total;
};

const evolve = (grid: Set<String>) => {
  const newGrid: Set<String> = new Set();

  const checked: Set<String> = new Set();

  Array.from(grid).forEach((c) => {
    const coord = c.split(",").map((x) => parseInt(x));

    search(coord).forEach((nc) => {
      const newCoord = nc.join(",");

      if (!checked.has(newCoord)) {
        const neighbours = count(grid, nc);

        if ((grid.has(newCoord) && neighbours === 2) || neighbours === 3) {
          newGrid.add(newCoord);
        }
        checked.add(newCoord);
      }
    });
  });

  return newGrid;
};

const simulate = (input: Input, dims: number) => {
  const slice = input.asGrid();

  let grid: Set<String> = new Set();

  slice.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === "#") {
        const coord = [x, y];
        while (coord.length < dims) coord.push(0);
        grid.add(coord.join(","));
      }
    })
  );

  for (let i = 0; i < 6; i++) {
    grid = evolve(grid);
  }

  return grid.size;
};

export const part1 = (input: Input) => simulate(input, 3);
export const part2 = (input: Input) => simulate(input, 4);
