import { Input } from "../input";
import { Coord, sum } from "../utils";

type Coord3 = Coord & { z: number };
type Brick = [Coord3, Coord3];

const intersects = (brick1: Brick, brick2: Brick) => {
  const minX1 = Math.min(brick1[0].x, brick1[1].x);
  const minY1 = Math.min(brick1[0].y, brick1[1].y);
  const minZ1 = Math.min(brick1[0].z, brick1[1].z);
  const maxX1 = Math.max(brick1[0].x, brick1[1].x);
  const maxY1 = Math.max(brick1[0].y, brick1[1].y);
  const maxZ1 = Math.max(brick1[0].z, brick1[1].z);

  const minX2 = Math.min(brick2[0].x, brick2[1].x);
  const minY2 = Math.min(brick2[0].y, brick2[1].y);
  const minZ2 = Math.min(brick2[0].z, brick2[1].z);
  const maxX2 = Math.max(brick2[0].x, brick2[1].x);
  const maxY2 = Math.max(brick2[0].y, brick2[1].y);
  const maxZ2 = Math.max(brick2[0].z, brick2[1].z);

  return !(
    maxX1 < minX2 ||
    maxX2 < minX1 ||
    maxY1 < minY2 ||
    maxY2 < minY1 ||
    maxZ1 < minZ2 ||
    maxZ2 < minZ1
  );
};

const moveDown = (brick: Brick): Brick => [
  { ...brick[0], z: brick[0].z - 1 },
  { ...brick[1], z: brick[1].z - 1 },
];

const parse = (input: Input): Brick[] =>
  input.asLines().map((l) => {
    const [_, x1, y1, z1, x2, y2, z2] = l.match(
      /^(\d+),(\d+),(\d+)~(\d+),(\d+),(\d+)$/
    )!;
    return [
      { x: parseInt(x1), y: parseInt(y1), z: parseInt(z1) },
      { x: parseInt(x2), y: parseInt(y2), z: parseInt(z2) },
    ];
  });

const settle = (bricks: Brick[]) => {
  let settled = false;
  while (!settled) {
    settled = true;

    bricks.forEach((brick1, i) => {
      if (
        brick1[0].z > 1 &&
        brick1[1].z > 1 &&
        !bricks.some(
          (brick2, j) => i !== j && intersects(moveDown(brick1), brick2)
        )
      ) {
        brick1[0].z -= 1;
        brick1[1].z -= 1;
        settled = false;
      }
    });
  }
};

const getSupports = (bricks: Brick[]) => {
  const supportedBy: number[][] = bricks.map(() => []);

  bricks.forEach((brick1, i) => {
    bricks.forEach((brick2, j) => {
      if (i !== j && intersects(moveDown(brick1), brick2)) {
        supportedBy[i].push(j);
      }
    });
  });

  return supportedBy;
};

let bricks: ReturnType<typeof parse>;
let supportedBy: ReturnType<typeof getSupports>;

export const part1 = (input: Input) => {
  bricks = parse(input);
  settle(bricks);
  supportedBy = getSupports(bricks);

  return bricks.filter(
    (_, i) => !supportedBy.some((s) => s.length === 1 && s[0] === i)
  ).length;
};

export const part2 = (input: Input) => {
  return bricks
    .map((_, i) => {
      const falling = new Set([i]);

      let added = true;

      while (added) {
        added = false;
        supportedBy.forEach((s, j) => {
          if (
            !falling.has(j) &&
            s.length > 0 &&
            s.every((q) => falling.has(q))
          ) {
            falling.add(j);
            added = true;
          }
        });
      }

      return falling.size - 1;
    })
    .reduce(sum);
};
