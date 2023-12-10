import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day6";

const input = asInput(`
Time:      7  15   30
Distance:  9  40  200
`);

test("part1", () => {
  expect(part1(input)).toBe(288);
});

test("part2", () => {
  expect(part2(input)).toBe(71503);
});
