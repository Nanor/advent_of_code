import { Input } from "../input";

type Point = { x: number; y: number };
type Area = { minX: number; maxX: number; minY: number; maxY: number };

const parse = (input: Input): Area => {
  const [x1, x2, y1, y2] = input
    .asString()
    .match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/)
    .slice(1, 5)
    .map((d) => parseInt(d, 10));

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  return { maxX, minX, minY, maxY };
};

const simulate = (init: Point, target: Area) => {
  let pos = { x: 0, y: 0 };
  let vel = { ...init };

  const points = [];

  while (pos.x <= target.maxX && pos.y >= target.minY) {
    pos = { x: pos.x + vel.x, y: pos.y + vel.y };
    vel = { x: vel.x - Math.sign(vel.x), y: vel.y - 1 };

    points.push(pos);

    if (
      pos.x >= target.minX &&
      pos.x <= target.maxX &&
      pos.y >= target.minY &&
      pos.y <= target.maxY
    ) {
      return Math.max(...points.map(({ y }) => y));
    }
  }
};

export const part1 = (input: Input) => {
  const { maxX, minX, minY, maxY } = parse(input);

  let maxHeight = 0;

  let y = 0;
  while (y < 1000) {
    for (let x = 0; x <= maxX; x++) {
      const h = simulate({ x, y }, { minX, maxX, minY, maxY });

      if (h !== undefined) {
        maxHeight = Math.max(h, maxHeight);
      }
    }
    y += 1;
  }

  return maxHeight;
};

export const part2 = (input: Input) => {
  const { maxX, minX, minY, maxY } = parse(input);

  let out = 0;

  let y = minY - 1;
  while (y < 1000) {
    for (let x = 0; x <= maxX; x++) {
      const h = simulate({ x, y }, { minX, maxX, minY, maxY });

      if (h !== undefined) {
        out += 1;
      }
    }
    y += 1;
  }

  return out;
};
