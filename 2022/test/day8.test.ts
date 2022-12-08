import { part1, part2 } from "../src/days/day8";
import { asInput } from "../src/input";

const input = asInput(`30373
25512
65332
33549
35390`);

test("part 1", () => {
  expect(part1(input)).toBe(21);
});

test("part 2", () => {
  expect(part2(input)).toBe(8);
});
