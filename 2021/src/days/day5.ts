import { Input } from "../input";

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const parse = (input: Input): Line[] =>
  input.asLines().map((l) => {
    const [_, ...ps] = l.match(/(\d+),(\d+) -> (\d+),(\d+)/);
    const [x1, y1, x2, y2] = ps.map((p) => parseInt(p, 10));

    return { x1, y1, x2, y2 };
  });

export const part1 = (input: Input) => {
  const lines = parse(input);
  const grid = new Map<string, number>();

  lines.forEach(({ x1, x2, y1, y2 }) => {
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        const coord = `${x1},${y}`;
        grid.set(coord, (grid.get(coord) || 0) + 1);
      }
    }
    if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        const coord = `${x},${y1}`;
        grid.set(coord, (grid.get(coord) || 0) + 1);
      }
    }
  });

  return Array.from(grid.values()).filter((x) => x > 1).length;
};

export const part2 = (input: Input) => {
  const lines = parse(input);

  const grid = new Map<string, number>();

  lines.forEach(({ x1, x2, y1, y2 }) => {
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        const coord = `${x1},${y}`;
        grid.set(coord, (grid.get(coord) || 0) + 1);
      }

      return;
    }

    const yStep = Math.sign(y2 - y1) * Math.sign(x2 - x1);
    const yStart = x1 < x2 ? y1 : y2;

    let i = 0;

    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      const coord = `${x},${yStart + yStep * i}`;
      grid.set(coord, (grid.get(coord) || 0) + 1);
      i += 1;
    }
  });

  return Array.from(grid.values()).filter((x) => x > 1).length;
};
