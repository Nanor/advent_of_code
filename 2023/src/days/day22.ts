import { Input } from "../input";
import { Coord3, isDefined, sum } from "../utils";

type Brick = [Coord3, Coord3];

const intersects = (brick1: Brick, brick2: Brick) =>
  !(
    brick1[1].x < brick2[0].x ||
    brick2[1].x < brick1[0].x ||
    brick1[1].y < brick2[0].y ||
    brick2[1].y < brick1[0].y ||
    brick1[1].z < brick2[0].z ||
    brick2[1].z < brick1[0].z
  );

const moveDown = (brick: Brick): Brick => [
  { ...brick[0], z: brick[0].z - 1 },
  { ...brick[1], z: brick[1].z - 1 },
];

const parse = (input: Input): Brick[] =>
  input.asLines().map((l) => {
    const [x1, y1, z1, x2, y2, z2] = l
      .match(/^(\d+),(\d+),(\d+)~(\d+),(\d+),(\d+)$/)!
      .slice(1)
      .map((d) => parseInt(d));

    return [
      { x: Math.min(x1, x2), y: Math.min(y1, y2), z: Math.min(z1, z2) },
      { x: Math.max(x1, x2), y: Math.max(y1, y2), z: Math.max(z1, z2) },
    ];
  });

const settle = (bricks: Brick[]) => {
  bricks.sort((a, b) => a[0].z - b[0].z);

  bricks.forEach((brick, i) => {
    const others = bricks.slice(0, i);

    const maxZ = Math.max(
      ...others
        .filter((b2) => intersects(b2, [{ ...brick[0], z: 0 }, brick[1]]))
        .map((b2) => b2[1].z),
      0
    );
    const height = brick[1].z - brick[0].z;

    brick[0].z = maxZ + 1;
    brick[1].z = brick[0].z + height;
  });
};

const getSupports = (bricks: Brick[]): number[][] =>
  bricks.map((brick1, i) =>
    bricks
      .slice(0, i)
      .map((brick2, j) => {
        if (intersects(moveDown(brick1), brick2)) {
          return j;
        }
      })
      .filter(isDefined)
  );

export const part1 = (input: Input) => {
  const bricks = parse(input);
  settle(bricks);
  const supportedBy = getSupports(bricks);

  return bricks.filter(
    (_, i) => !supportedBy.some((s) => s.length === 1 && s[0] === i)
  ).length;
};

export const part2 = (input: Input) => {
  const bricks = parse(input);
  settle(bricks);
  const supportedBy = getSupports(bricks);

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
