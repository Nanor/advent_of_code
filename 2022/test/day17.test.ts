import { part1, part2 } from "../src/days/day17";
import { asInput } from "../src/input";

const input = asInput(`>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`);

test("part 1", () => {
  expect(part1(input)).toBe(3068);
});

test("part 2", () => {
  expect(part2(input)).toBe(1514285714288);
});
