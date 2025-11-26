import { Input } from "../input";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const part1 = (input: Input) =>
  input
    .asLines()
    .map((l) => {
      const length = l.length / 2;

      return [l.slice(0, length), l.slice(length)];
    })
    .map(([a, b]) => {
      for (const c of a.split("")) {
        if (b.includes(c)) return c;
      }
    })
    .map((c) => LETTERS.indexOf(c) + 1)
    .reduce((a, x) => a + x, 0);

export const part2 = (input: Input) => {
  const lines = input.asLines();

  return [...Array(lines.length / 3)]
    .map((_, i) => lines.slice(i * 3, (i + 1) * 3))
    .map(([x, y, z]) => {
      for (const c of x.split("")) {
        if (y.includes(c) && z.includes(c)) return c;
      }
    })
    .map((c) => LETTERS.indexOf(c) + 1)
    .reduce((a, x) => a + x, 0);
};
