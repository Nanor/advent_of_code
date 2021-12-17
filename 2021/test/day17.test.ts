import { part1, part2 } from "../src/days/day17";
import { asInput } from "../src/input";

const input = asInput(`target area: x=20..30, y=-10..-5`);

test("part 1", () => {
  expect(part1(input)).toBe(45);
});

test("part 2", () => {
  expect(part2(input)).toBe(112);
});
