import { part1, part2 } from "../src/days/day7";
import { asInput } from "../src/input";

const input = asInput("16,1,2,0,4,2,7,1,2,14");

test("part 1", () => {
  expect(part1(input)).toBe(37);
});

test("part 2", () => {
  expect(part2(input)).toBe(168);
});
