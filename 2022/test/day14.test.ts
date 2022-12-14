import { part1, part2 } from "../src/days/day14";
import { asInput } from "../src/input";

const input = asInput(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`);

test("part 1", () => {
  expect(part1(input)).toBe(24);
});

test("part 2", () => {
  expect(part2(input)).toBe(93);
});
