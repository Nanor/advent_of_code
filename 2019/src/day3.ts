import { Input } from "./input";

type Direction = "R" | "D" | "L" | "U";

type Wire = {
  dir: Direction;
  len: number;
}[];

type Point = {
  x: number;
  y: number;
  dist: number;
};

const asWires = (input: Input): Wire[] =>
  input
    .asLines()
    .map(l => l.split(","))
    .map(wire =>
      wire.map(x => ({ dir: x[0] as Direction, len: parseInt(x.slice(1), 10) }))
    );

const traceWire = (wire: Wire) => {
  let x = 0;
  let y = 0;
  let dist = 0;
  const points: Point[] = [];

  wire.forEach(({ dir, len }) => {
    const [dx, dy] = {
      U: [0, -1],
      D: [0, 1],
      L: [-1, 0],
      R: [1, 0]
    }[dir];

    for (let n = 0; n < len; n++) {
      x += dx;
      y += dy;
      dist += 1;
      points.push({ x, y, dist });
    }
  });

  return points;
};

const getHits = (wires: Wire[]): Point[] => {
  const points = wires.map(w => traceWire(w));

  const points1 = points[0];
  const points2 = points[1];

  const points2Hash = {};

  points2.forEach(p => {
    points2Hash[hash(p)] = p;
  });

  const hits: Point[] = [];

  points1.forEach(p1 => {
    if (points2Hash[hash(p1)]) {
      const p2 = points2Hash[hash(p1)];
      hits.push({ x: p1.x, y: p2.y, dist: p1.dist + p2.dist });
    }
  });

  return hits;
};

const hash = ({ x, y }: Point): number => {
  const t = Math.abs(x) + Math.abs(y);
  const t2 = (t * (t + 2)) / 2;
  const t3 = t2 - Math.abs(y);
  return t3 * 4 + (x < 0 ? 1 : 0) + (y < 0 ? 2 : 0);
};

let hits: Point[];

export const part1 = (input: Input) => {
  const wires = asWires(input);
  hits = getHits(wires);

  const closest = hits
    .map(({ x, y }) => Math.abs(x) + Math.abs(y))
    .reduce((acc, x) => (acc < x ? acc : x), Number.MAX_VALUE);

  return closest;
};

export const part2 = (input: Input) => {
  // const wires = asWires(input);
  // const hits = getHits(wires);

  const closest = hits
    .map(({ dist }) => dist)
    .reduce((acc, x) => (acc < x ? acc : x), Number.MAX_VALUE);

  return closest;
};
