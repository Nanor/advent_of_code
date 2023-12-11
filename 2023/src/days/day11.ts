import { Input } from "../input";
import { Coord, sum } from "../utils";

export const solve = (input: Input, expansion: number) => {
  const grid = input.asCharGrid();
  let galaxies: Coord[] = [];

  grid.forEach((line, y) => {
    line.forEach((c, x) => {
      if (c === "#") galaxies.push({ x, y });
    });
  });

  const maxX = Math.max(...galaxies.map((g) => g.x));
  const maxY = Math.max(...galaxies.map((g) => g.y));

  const emptyCols: number[] = [];
  const emptyRows: number[] = [];

  for (let x = 0; x < maxX; x++) {
    if (!galaxies.some((g) => g.x === x)) {
      emptyCols.push(x);
    }
  }
  for (let y = 0; y < maxY; y++) {
    if (!galaxies.some((g) => g.y === y)) {
      emptyRows.push(y);
    }
  }

  galaxies = galaxies.map((g) => ({
    x: g.x + emptyCols.filter((x) => x < g.x).length * (expansion - 1),
    y: g.y + emptyRows.filter((y) => y < g.y).length * (expansion - 1),
  }));

  return galaxies
    .flatMap((g1, i) =>
      galaxies
        .slice(0, i)
        .map((g2) => Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y))
    )
    .reduce(sum);
};

export const part1 = (input: Input) => solve(input, 2);
export const part2 = (input: Input) => solve(input, 1000000);
