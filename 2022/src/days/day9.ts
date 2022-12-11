import { Input } from "../input";

type Coord = {
  x: number;
  y: number;
};

type Dir = "R" | "U" | "L" | "D";

const move = ({ x, y }: Coord, d: Dir): Coord => {
  switch (d) {
    case "U":
      return { x, y: y - 1 };
    case "D":
      return { x, y: y + 1 };
    case "L":
      return { x: x - 1, y };
    case "R":
      return { x: x + 1, y };
  }
};

const pull = (tail: Coord, head: Coord): Coord => {
  if (Math.abs(tail.x - head.x) > 1 || Math.abs(tail.y - head.y) > 1) {
    const xDir = Math.sign(head.x - tail.x);
    const yDir = Math.sign(head.y - tail.y);

    return { x: tail.x + xDir, y: tail.y + yDir };
  }

  return tail;
};

const solve = (input: Input, length: number) => {
  const rope = [...Array(length)].map(() => ({ x: 0, y: 0 }));

  const path = [rope[length - 1]];

  input
    .asLines()
    .filter(Boolean)
    .forEach((line) => {
      const parts = line.trim().split(" ");
      const dir = parts[0] as Dir;
      const count = parseInt(parts[1], 10);

      [...Array(count)].forEach(() => {
        rope[0] = move(rope[0], dir);
        [...Array(length - 1)].forEach((_, i) => {
          rope[i + 1] = pull(rope[i + 1], rope[i]);
        });
        path.push(rope[length - 1]);
      });
    });

  return new Set(path.map(({ x, y }) => `${x},${y}`)).size;
};

export const part1 = (input: Input) => solve(input, 2);
export const part2 = (input: Input) => solve(input, 10);
