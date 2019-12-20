import { Input } from "./input";
const aStar = require("a-star");

type Point = { x: number; y: number };
type Point3 = { x: number; y: number; z: number };

const getTile = (grid: string[][], x: number, y: number) => {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
    return " ";
  }

  return grid[y][x];
};
const equal = (p1: Point, p2: Point) => p1.x === p2.x && p1.y === p2.y;

const parseInput = (input: Input) => {
  const grid = input.asGrid();

  const warps: { [x: string]: Point[] } = {};

  grid.forEach((line, y) => {
    line.forEach((c, x) => {
      if (c.match(/[A-Z]/)) {
        let loc: Point;
        let name = [c];

        const dirs = [
          { x: x - 1, y },
          { x: x + 1, y },
          { x, y: y - 1 },
          { x, y: y + 1 }
        ];
        dirs.forEach(({ x: x2, y: y2 }) => {
          const t = getTile(grid, x2, y2);
          if (t === ".") loc = { x: x2, y: y2 };
          if (t.match(/[A-Z]/)) name.push(t);
        });

        if (loc) {
          const key = name.sort().join("");
          if (key in warps) warps[key].push(loc);
          else warps[key] = [loc];
        }
      }
    });
  });

  const start: Point = warps.AA[0];
  const end: Point = warps.ZZ[0];

  return { grid, warps, start, end };
};

export const part1 = (input: Input) => {
  const { grid, warps, start, end } = parseInput(input);

  const res = aStar({
    start,
    isEnd: (p: Point) => equal(p, end),
    distance: () => 1,
    // heuristic: ({ x, y }) => Math.abs(x - end.x) + Math.abs(y - end.y),
    heuristic: () => 1,
    hash: ({ x, y }) => `${x},${y}`,
    neighbor: ({ x, y }) => {
      const dirs = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 }
      ];
      const ns = dirs.filter(({ x, y }) => getTile(grid, x, y) === ".");

      const ws = Object.values(warps).find(ws =>
        ws.some(p => equal(p, { x, y }))
      );
      if (ws) {
        const other = ws.find(p => !equal(p, { x, y }));
        if (other) {
          ns.push(other);
        }
      }

      return ns;
    }
  });

  return res.cost;
};

export const part2 = (input: Input) => {
  const { grid, warps, start: start2, end: end2 } = parseInput(input);

  const start: Point3 = { ...start2, z: 0 };
  const end: Point3 = { ...end2, z: 0 };

  const height = grid.length;
  const width = Math.max(...grid.map(l => l.length));

  const equal3 = (p1: Point3, p2: Point3) =>
    p1.x === p2.x && p1.y === p2.y && p1.z === p2.z;

  const res = aStar({
    start,
    isEnd: (p: Point3) => equal3(p, end),
    distance: () => 1,
    // heuristic: ({ x, y }) => Math.abs(x - end.x) + Math.abs(y - end.y),
    heuristic: () => 1,
    hash: ({ x, y, z }: Point3) => `${x},${y},${z}`,
    neighbor: ({ x, y, z }: Point3): Point3[] => {
      const dirs = [
        { x: x - 1, y, z },
        { x: x + 1, y, z },
        { x, y: y - 1, z },
        { x, y: y + 1, z }
      ];
      const ns = dirs.filter(({ x, y }) => getTile(grid, x, y) === ".");

      const ws = Object.values(warps).find(ws =>
        ws.some(p => equal(p, { x, y }))
      );
      if (ws) {
        const other = ws.find(p => !equal(p, { x, y }));
        if (other) {
          const outer =
            other.x === 2 ||
            other.y === 2 ||
            other.x === width - 3 ||
            other.y === height - 3;

          if (outer || z !== 0) {
            ns.push({ ...other, z: z + (outer ? 1 : -1) });
          }
        }
      }

      return ns;
    }
  });

  return res.cost;
};
