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

  return galaxies
    .flatMap((g1, i) =>
      galaxies.slice(0, i).map((g2) => {
        const x1 = Math.min(g1.x, g2.x);
        const x2 = Math.max(g1.x, g2.x);
        const y1 = Math.min(g1.y, g2.y);
        const y2 = Math.max(g1.y, g2.y);

        const expX = emptyCols.filter((c) => c > x1 && c < x2).length;
        const expY = emptyRows.filter((c) => c > y1 && c < y2).length;

        return (
          x2 - x1 + expX * (expansion - 1) + (y2 - y1 + expY * (expansion - 1))
        );
      })
    )
    .reduce(sum);
};

export const part1 = (input: Input) => solve(input, 2);
export const part2 = (input: Input) => solve(input, 1000000);
