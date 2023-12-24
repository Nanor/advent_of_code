import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day24";

const input = asInput(`
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`);

test("part1", () => {
  expect(part1(input, { min: 7, max: 27 })).toBe(2);
});

test("part2", () => {
  expect(part2(input)).toBe(47);
});
