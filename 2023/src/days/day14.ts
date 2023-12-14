import { Input } from "../input";
import { sum } from "../utils";

const rollNorth = (grid: string[][], width: number, height: number) => {
  for (let x = 0; x < width; x++) {
    for (let y1 = 0; y1 < height - 1; y1++) {
      if (grid[y1][x] === ".") {
        for (let y2 = y1 + 1; y2 < height; y2++) {
          if (grid[y2][x] === "#") {
            y1 = y2;
            break;
          }
          if (grid[y2][x] === "O") {
            grid[y1][x] = "O";
            grid[y2][x] = ".";
            break;
          }
        }
      }
    }
  }
};

const rollSouth = (grid: string[][], width: number, height: number) => {
  for (let x = 0; x < width; x++) {
    for (let y1 = height - 1; y1 > 0; y1--) {
      if (grid[y1][x] === ".") {
        for (let y2 = y1 - 1; y2 >= 0; y2--) {
          if (grid[y2][x] === "#") {
            y1 = y2;
            break;
          }
          if (grid[y2][x] === "O") {
            grid[y1][x] = "O";
            grid[y2][x] = ".";
            break;
          }
        }
      }
    }
  }
};

const rollWest = (grid: string[][], width: number, height: number) => {
  for (let y = 0; y < height; y++) {
    for (let x1 = 0; x1 < width - 1; x1++) {
      if (grid[y][x1] === ".") {
        for (let x2 = x1 + 1; x2 < width; x2++) {
          if (grid[y][x2] === "#") {
            x1 = x2;
            break;
          }
          if (grid[y][x2] === "O") {
            grid[y][x1] = "O";
            grid[y][x2] = ".";
            break;
          }
        }
      }
    }
  }
};

const rollEast = (grid: string[][], width: number, height: number) => {
  for (let y = 0; y < height; y++) {
    for (let x1 = width - 1; x1 > 0; x1--) {
      if (grid[y][x1] === ".") {
        for (let x2 = x1 - 1; x2 >= 0; x2--) {
          if (grid[y][x2] === "#") {
            x1 = x2;
            break;
          }
          if (grid[y][x2] === "O") {
            grid[y][x1] = "O";
            grid[y][x2] = ".";
            break;
          }
        }
      }
    }
  }
};

export const part1 = (input: Input) => {
  const grid = input.asCharGrid();
  const width = grid[0].length;
  const height = grid.length;

  rollNorth(grid, width, height);

  return grid
    .map((line, y) => line.filter((c) => c === "O").length * (grid.length - y))
    .reduce(sum);
};

export const part2 = (input: Input) => {
  const grid = input.asCharGrid();
  const width = grid[0].length;
  const height = grid.length;

  const cache = new Map<string, number>();

  const iterCount = 1000000000;

  for (let i = 0; i < iterCount; i++) {
    rollNorth(grid, width, height);
    rollWest(grid, width, height);
    rollSouth(grid, width, height);
    rollEast(grid, width, height);

    const key = grid.map((l) => l.join("")).join("\n");

    if (cache.has(key)) {
      const loopSize = i - cache.get(key)!;
      i += Math.floor((iterCount - i) / loopSize) * loopSize;
    }
    cache.set(key, i);
  }

  return grid
    .map((line, y) => line.filter((c) => c === "O").length * (grid.length - y))
    .reduce(sum);
};
