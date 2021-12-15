import { Input } from "../input";

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

type Point = { x: number; y: number };

const search = (end: Point, getRisk: (p: Point) => number): number => {
  const totalRisks: number[][] = [];

  const getTotalRisk = ({ x, y }: Point) =>
    totalRisks[y] ? totalRisks[y][x] : undefined;

  const setTotalRisk = ({ x, y }: Point, v: number) => {
    totalRisks[y] = totalRisks[y] || [];
    totalRisks[y][x] = v;
  };

  const points = [{ x: 0, y: 0 }];
  setTotalRisk(points[0], 0);

  while (points.length) {
    points.sort((a, b) => totalRisks[a.y][a.x] - totalRisks[b.y][b.x]);

    const p = points.shift();
    const { x, y } = p;

    const currRisk = getTotalRisk(p);

    dirs.forEach(([dx, dy]) => {
      const newP = { x: x + dx, y: y + dy };
      const r = getRisk(newP);

      if (r !== undefined) {
        const newRisk = currRisk + r;
        const oldRisk = getTotalRisk(newP);

        if (oldRisk === undefined || newRisk < oldRisk) {
          setTotalRisk(newP, newRisk);
          points.push(newP);
        }
      }
    });
  }

  return getTotalRisk(end);
};

export const part1 = (input: Input) => {
  const grid = input.asNumberGrid();

  return search(
    { x: grid[0].length - 1, y: grid.length - 1 },
    ({ x, y }) => grid[y] && grid[y][x]
  );
};

export const part2 = (input: Input) => {
  const grid = input.asNumberGrid();

  const w = grid[0].length;
  const h = grid.length;

  const width = w * 5 - 1;
  const height = h * 5 - 1;

  return search({ x: width, y: height }, ({ x, y }) => {
    if (x < 0 || x > width || y < 0 || y > height) return undefined;

    const v = grid[y % h][x % w] + Math.floor(y / h) + Math.floor(x / w);
    return (v % 10) + (v > 9 ? 1 : 0);
  });
};
