import { Input } from "./input";

const count = (grid: string[][], x: number, y: number): number => {
  let total = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx !== 0 || dy !== 0) {
        if (grid[y + dy] && grid[y + dy][x + dx] === "#") {
          total += 1;
        }
      }
    }
  }

  return total;
};

const evolve = (grid: string[][]): string[][] => {
  const newGrid = grid.map((row, y) =>
    row.map((c, x) => {
      if (c === ".") return ".";

      const ns = count(grid, x, y);

      if (c === "L") {
        return ns === 0 ? "#" : "L";
      }
      if (c === "#") {
        return ns >= 4 ? "L" : "#";
      }
    })
  );

  return newGrid;
};

export const part1 = (input: Input) => {
  let seats = input.asGrid();

  while (true) {
    const newSeats = evolve(seats);

    if (JSON.stringify(newSeats) === JSON.stringify(seats)) {
      return newSeats.reduce(
        (acc, row) => acc + row.reduce((x, y) => (y === "#" ? x + 1 : x), 0),
        0
      );
    }

    seats = newSeats;
  }
};

const count2 = (grid: string[][], x: number, y: number): number => {
  let total = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx !== 0 || dy !== 0) {
        let cx = x;
        let cy = y;

        while (true) {
          cx += dx;
          cy += dy;

          const cell = grid[cy] && grid[cy][cx];

          if (cell === ".") {
            continue;
          }
          if (cell === "#") {
            total += 1;
          }
          break;
        }
      }
    }
  }

  return total;
};

const evolve2 = (grid: string[][]): string[][] => {
  const newGrid = grid.map((row, y) =>
    row.map((c, x) => {
      if (c === ".") return ".";

      const ns = count2(grid, x, y);

      if (c === "L") {
        return ns === 0 ? "#" : "L";
      }
      if (c === "#") {
        return ns >= 5 ? "L" : "#";
      }
    })
  );

  return newGrid;
};

export const part2 = (input: Input) => {
  let seats = input.asGrid();

  while (true) {
    const newSeats = evolve2(seats);

    if (JSON.stringify(newSeats) === JSON.stringify(seats)) {
      return newSeats.reduce(
        (acc, row) => acc + row.reduce((x, y) => (y === "#" ? x + 1 : x), 0),
        0
      );
    }

    seats = newSeats;
  }
};
