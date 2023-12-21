import { Input } from "../input";
import { Coord } from "../utils";

const dirs = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
] as const;

export const part1 = (input: Input, steps = 64) => {
  const grid = input.asGrid();

  const width = grid.width;
  const height = grid.height;

  const start = grid.indexOf("S")!;

  const rocks = new Set(
    grid
      .entries()
      .filter(([c, x]) => x === "#")
      .map(([{ x, y }]) => `${x},${y}`)
  );

  let toCheck = [start];

  const evenLocations = new Set<string>();
  const oddLocations = new Set<string>();

  for (let i = 0; i < steps; i++) {
    const locSet = i % 2 ? evenLocations : oddLocations;

    const newToCheck: typeof toCheck = [];

    toCheck.forEach(({ x, y }) =>
      dirs.forEach(([dx, dy]) => {
        const c = { x: x + dx, y: y + dy };

        if (
          rocks.has(
            `${((c.x % width) + width) % width},${
              ((c.y % height) + height) % height
            }`
          )
        )
          return;

        const key = `${c.x},${c.y}`;
        if (locSet.has(key)) return;
        locSet.add(key);

        newToCheck.push(c);
      })
    );

    toCheck = newToCheck;
  }

  return evenLocations.size;
};

export const part2 = (input: Input, steps = 26501365) => {
  const grid = input.asGrid();

  const width = grid.width;
  const height = grid.height;

  const start = grid.indexOf("S")!;

  const rocks = new Set(
    grid
      .entries()
      .filter(([c, x]) => x === "#")
      .map(([{ x, y }]) => `${x},${y}`)
  );

  const evenLocations = new Set<string>();
  const oddLocations = new Set<string>();

  let toCheck: Coord[] = [start];

  let f0 = 0;
  let f1 = 0;
  let f2 = 0;

  for (let i = 0; i < steps; i++) {
    const locSet = i % 2 ? evenLocations : oddLocations;

    const newToCheck: typeof toCheck = [];

    toCheck.forEach(({ x, y }) =>
      dirs.forEach(([dx, dy]) => {
        const c = { x: x + dx, y: y + dy };

        if (
          rocks.has(
            `${((c.x % width) + width) % width},${
              ((c.y % height) + height) % height
            }`
          )
        )
          return;

        const key = `${c.x},${c.y}`;
        if (locSet.has(key)) return;
        locSet.add(key);

        newToCheck.push(c);
      })
    );

    toCheck = newToCheck;

    if (i % 262 === 65) {
      const n = Math.floor(i / 262);

      if (n === 0) {
        f0 = oddLocations.size;
      }
      if (n === 1) {
        f1 = oddLocations.size;
      }
      if (n === 2) {
        f2 = oddLocations.size;
        break;
      }
    }
  }

  const a = f2 / 2 - f1 + f0 / 2;
  const b = f1 - f0 - a;
  const c = f0;

  const n = Math.floor(steps / 262);
  return a * n * n + b * n + c;
};
