import type { Input } from "../input";
import { Coord, Dir, sum } from "../utils";

const solve = (instructions: { dir: Dir; dist: number }[]) => {
  const coords = instructions.reduce<Coord[]>(
    (acc, { dir, dist }) => {
      let last = { ...acc.at(-1)! };

      switch (dir) {
        case "L":
          last.x -= dist;
          break;
        case "R":
          last.x += dist;
          break;
        case "U":
          last.y -= dist;
          break;
        case "D":
          last.y += dist;
          break;
      }

      return [...acc, last];
    },
    [{ x: 0, y: 0 }]
  );

  const area = coords
    .slice(0, -1)
    .map((_, i) => {
      const a = coords[i];
      const b = coords[i + 1];

      return (a.x - b.x) * a.y;
    })
    .reduce(sum);

  const border = instructions.map((i) => i.dist).reduce(sum);

  return area + border / 2 + 1;
};

export const part1 = (input: Input) => {
  const instructions = input.asLines().map((l) => {
    const [_, dir, dist] = l.match(/^([UDLR]) (\d+) \(#(\S{6})\)$/)!;
    return { dir: dir as Dir, dist: parseInt(dist) };
  });

  return solve(instructions);
};

export const part2 = (input: Input) => {
  const instructions = input.asLines().map((l) => {
    const color = l.match(/^([UDLR]) (\d+) \(#(\S{6})\)$/)![3];

    return {
      dir: "RDLU"[parseInt(color[5])] as Dir,
      dist: parseInt(color.slice(0, 5), 16),
    };
  });

  return solve(instructions);
};
