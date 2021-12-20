import { Input } from "../input";

const print = (grid: boolean[][]) => {
  console.log(
    grid.map((l) => l.map((c) => (c ? "#" : ".")).join("")).join("\n") + "\n"
  );
};

const extract = (
  grid: boolean[][],
  x: number,
  y: number,
  def = false
): boolean[] => {
  return [y - 1, y, y + 1].flatMap((y) =>
    [x - 1, x, x + 1].map((x) => (grid[y] ? grid[y][x] : undefined) ?? def)
  );
};

const evolve = (grid: boolean[][], alg: boolean[], t: number): boolean[][] => {
  const def = alg[0] && t % 2 === 1;

  const size = grid.length + 2;
  grid = [
    [...Array(size)].fill(def),
    ...grid.map((l) => [def, ...l, def]),
    [...Array(size)].fill(def),
  ];

  const newGrid = grid.map((l, y) =>
    l.map((c, x) => {
      const sig = extract(grid, x, y, def);
      const v = sig.reduce((acc, x) => (acc << 1) + (x ? 1 : 0), 0);
      return alg[v];
    })
  );

  return newGrid;
};

const enhance = (input: Input, count: number) => {
  const [[al], grd] = input.asParagraphs();

  const alg = al.split("").map((c) => c === "#");
  let grid = grd.map((l) => l.split("").map((c) => c === "#"));

  for (let n = 0; n < count; n++) {
    grid = evolve(grid, alg, n);
  }

  return grid.reduce((acc, l) => acc + l.filter(Boolean).length, 0);
};

export const part1 = (input: Input) => enhance(input, 2);
export const part2 = (input: Input) => enhance(input, 50);
