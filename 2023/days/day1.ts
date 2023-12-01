import { Input } from "../input";

export const part1 = (input: Input) =>
  input
    .asLines()
    .map((line) => {
      const match1 = line.match(/^[a-z]*([0-9])/);
      const match2 = line.match(/([0-9])[a-z]*$/);
      if (match1 && match2) {
        return parseInt(match1[1] + match2[1]);
      }
      return 0;
    })
    .reduce((x, y) => x + y, 0);

const wordNumbers: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const part2 = (input: Input) =>
  input
    .asLines()
    .map((line) => {
      const match1 =
        line.match(
          /(one|two|three|four|five|six|seven|eight|nine|[0-9])/
        )?.[1] || "";
      const match2 =
        line.match(
          /[a-z0-9]*(one|two|three|four|five|six|seven|eight|nine|[0-9])/
        )?.[1] || "";

      const a = wordNumbers[match1] ?? parseInt(match1);
      const b = wordNumbers[match2] ?? parseInt(match2);

      return a * 10 + b;
    })
    .reduce((x, y) => x + y, 0);
