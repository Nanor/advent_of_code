import { Input } from "./input";

type Point = {
  x: number;
  y: number;
};

type Polar = {
  x: number;
  y: number;
  r: number;
  a: number;
};

const getAsteroids = (grid: String[][]): Point[] => {
  const out: Point[] = [];
  grid.map((l: String[], y: any) =>
    l.map((c: String, x: any) => {
      if (c === "#") out.push({ x, y });
    })
  );

  return out;
};

const toPolar = (curr: Point, rest: Point[]): Polar[] => {
  const normalise = a => {
    const x = Math.PI / 2 + (a % (Math.PI * 2));
    return x >= 0 ? x : x + Math.PI * 2;
  };

  return rest
    .map(
      ({ x: x2, y: y2 }: Point): Polar => ({
        x: x2,
        y: y2,
        r: Math.sqrt(Math.pow(x2 - curr.x, 2) + Math.pow(y2 - curr.y, 2)),
        a: normalise(Math.atan2(y2 - curr.y, x2 - curr.x))
      })
    )
    .filter(({ r }) => r !== 0);
};

export const part1 = (input: Input) => {
  const grid = input.asGrid();
  const asteroids = getAsteroids(grid);

  return Math.max(
    ...asteroids.map(a => {
      const seen = toPolar(a, asteroids).reduce((acc, p) => {
        return acc.find(p2 => p.a === p2.a) ? acc : [...acc, p];
      }, []);

      return seen.length;
    })
  );
};

export const vaporised = (input: Input) => {
  const max = part1(input);

  const grid = input.asGrid();
  const asteroids = getAsteroids(grid);

  const best = asteroids.find(a => {
    const seen = toPolar(a, asteroids).reduce((acc, p) => {
      return acc.find(p2 => p.a === p2.a) ? acc : [...acc, p];
    }, []);

    return seen.length === max;
  });

  const polars = toPolar(best, asteroids);
  polars.sort(({ a: a1, r: r1 }, { a: a2, r: r2 }) =>
    a1 === a2 ? r1 - r2 : a1 - a2
  );

  const order: number[] = [];

  let angle = -Number.EPSILON;
  while (polars.length > 0) {
    let curr = polars.find(p => p.a > angle);
    if (curr === undefined) {
      angle = -Number.EPSILON;
      curr = polars.find(p => p.a > angle);
    }

    angle = curr.a;

    const index = polars.indexOf(curr);
    polars.splice(index, 1);

    order.push(curr.x * 100 + curr.y);
  }

  return order;
};

export const part2 = (input: Input) => {
  return vaporised(input)[200 - 1];
};
