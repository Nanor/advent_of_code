import { Input } from "../input";

const getLows = (grid: number[][]): number[][] => {
  const lows = [];

  grid.forEach((row, y) =>
    row.forEach((c, x) => {
      if (
        (x === 0 || row[x - 1] > c) &&
        (x === row.length - 1 || row[x + 1] > c) &&
        (y === 0 || grid[y - 1][x] > c) &&
        (y === grid.length - 1 || grid[y + 1][x] > c)
      ) {
        lows.push([x, y]);
      }
    })
  );

  return lows;
};

export const part1 = (input: Input) => {
  const grid = input.asNumberGrid();

  return getLows(grid).reduce((acc, [x, y]) => acc + grid[y][x] + 1, 0);
};

export const part2 = (input: Input) => {
  const grid = input.asNumberGrid();
  const lows = getLows(grid);

  const basins = lows.map(([x, y]) => {
    let count = 0;

    const fill = (x: number, y: number) => {
      if (grid[y] && grid[y][x] !== undefined && grid[y][x] !== 9) {
        count += 1;
        grid[y][x] = 9;

        fill(x + 1, y);
        fill(x - 1, y);
        fill(x, y + 1);
        fill(x, y - 1);
      }
    };

    fill(x, y);

    return count;
  });

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((x, y) => x * y, 1);
};
