import { Input } from "../input";

type Point = {
  x: number;
  y: number;
};

type Fold = {
  axis: "x" | "y";
  pos: number;
};

const parse = (input: Input): { points: Point[]; folds: Fold[] } => {
  const [ps, fs] = input.asParagraphs();

  const points: Point[] = ps
    .map((l) => l.split(",").map((n) => parseInt(n, 10)))
    .map(([x, y]) => ({ x, y }));
  const folds: Fold[] = fs.map((l) => {
    const m = l.match(/fold along ([xy])=(\d+)/);
    return { axis: m[1] as "x" | "y", pos: parseInt(m[2]) };
  });

  return { points, folds };
};

const makeFold = (points: Point[], { axis, pos }: Fold) =>
  points.reduce<Point[]>((acc, p) => {
    if (p[axis] > pos) {
      p[axis] = pos - (p[axis] - pos);
    }

    if (acc.some(({ x, y }) => x === p.x && y === p.y)) return acc;

    return [...acc, p];
  }, []);

export const part1 = (input: Input) => {
  const { points, folds } = parse(input);

  return makeFold(points, folds[0]).length;
};

export const part2 = (input: Input) => {
  const { points, folds } = parse(input);

  const result = folds.reduce((ps, fold) => makeFold(ps, fold), points);

  const maxX = Math.max(...result.map(({ x }) => x));
  const maxY = Math.max(...result.map(({ y }) => y));

  let out = "";

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      out += result.some((p) => p.x === x && p.y === y) ? "#" : " ";
    }
    out += "\n";
  }

  return out;
};
