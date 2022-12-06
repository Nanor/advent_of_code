import { Input } from "../input";

const solve = (input: Input, size: number) => {
  const chars = input.asString().split("");

  for (let i = 0; i < chars.length; i++) {
    const packet = chars.slice(i, i + size);

    if (new Set(packet).size === size) return i + size;
  }
};

export const part1 = (input: Input) => solve(input, 4);

export const part2 = (input: Input) => solve(input, 14);
