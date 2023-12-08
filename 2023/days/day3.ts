import { Input } from "../input";
import { sum } from "../utils";

const parse = (input: Input) => {
  const parts: {
    x: number;
    y: number;
    symbol: string;
    numbers: number[];
  }[] = [];
  const lines = input.asLines();

  lines.forEach((line, y) => {
    for (const m of line.matchAll(/[^0-9.]/g)) {
      parts.push({ symbol: m[0], x: m.index, y, numbers: [] });
    }
  });

  lines.forEach((line, y) => {
    const ps = parts.filter((p) => p.y >= y - 1 && p.y <= y + 1);
    for (const m of line.matchAll(/[0-9]+/g)) {
      const minX = m.index - 1;
      const maxX = m.index + m[0].length;

      ps.find((p) => p.x >= minX && p.x <= maxX)?.numbers.push(parseInt(m[0]));
    }
  });

  return parts;
};

export const part1 = (input: Input) =>
  parse(input).reduce((acc, p) => acc + p.numbers.reduce(sum), 0);

export const part2 = (input: Input) =>
  parse(input)
    .filter((p) => p.symbol === "*" && p.numbers.length === 2)
    .map(({ numbers: [x, y] }) => x * y)
    .reduce(sum);
