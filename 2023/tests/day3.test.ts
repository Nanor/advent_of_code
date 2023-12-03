import { expect, test } from "bun:test";
import { asInput } from "../input";
import { part1, part2 } from "../days/day3";

const input = asInput(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`);

test("part1", () => {
  expect(part1(input)).toBe(4361);
});

test("part2", () => {
  expect(part2(input)).toBe(467835);
});
