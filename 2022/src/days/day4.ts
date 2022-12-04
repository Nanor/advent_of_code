import { Input } from "../input";

const parse = (input: Input) =>
  input
    .asLines()
    .filter(Boolean)
    .map((l) => {
      const [a, b, c, d] = l.split(/-|,/).map((x) => parseInt(x, 10));

      return [
        { start: a, end: b },
        { start: c, end: d },
      ];
    });

export const part1 = (input: Input) =>
  parse(input).filter(
    ([e, f]) =>
      (e.start <= f.start && e.end >= f.end) ||
      (f.start <= e.start && f.end >= e.end)
  ).length;

export const part2 = (input: Input) =>
  parse(input).filter(([e, f]) => !(e.end < f.start || f.end < e.start)).length;
