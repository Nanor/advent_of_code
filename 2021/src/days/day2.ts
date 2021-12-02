import { Input } from "../input";

type Instruction = {
  dir: "forward" | "down" | "up";
  val: number;
};

const parse = (input: Input) =>
  input
    .asLines()
    .map((l) => l.split(" "))
    .map(([d, x]) => ({ dir: d, val: parseInt(x, 10) } as Instruction));

type Pos = {
  x: number;
  y: number;
};

export const part1 = (input: Input) => {
  const lines = parse(input);

  const pos = lines.reduce<Pos>(
    ({ x, y }, { dir, val }) => {
      if (dir === "forward") {
        return { x: x + val, y };
      }

      return { x, y: y + (dir === "down" ? val : -val) };
    },
    { x: 0, y: 0 }
  );

  return pos.x * pos.y;
};

type Pos2 = {
  x: number;
  y: number;
  aim: number;
};

export const part2 = (input: Input) => {
  const lines = parse(input);

  const pos = lines.reduce<Pos2>(
    ({ x, y, aim }, { dir, val }) => {
      if (dir === "forward") {
        return { x: x + val, y: y + val * aim, aim };
      }

      return { x, aim: aim + (dir === "down" ? val : -val), y };
    },
    { x: 0, y: 0, aim: 0 }
  );

  return pos.x * pos.y;
};
