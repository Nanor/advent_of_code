import { part1, part2 } from "../src/days/day2";
import { asInput } from "../src/input";

const input = asInput(`A Y
B X
C Z
`);

test("part 1", () => {
  expect(part1(input)).toBe(15);
});

test("part 2", () => {
  expect(part2(input)).toBe(12);
});
