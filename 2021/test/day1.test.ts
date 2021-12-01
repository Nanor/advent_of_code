import { part1, part2 } from "../src/days/day1";
import { asInput } from "../src/input";

test("part 1", () => {
  const input = asInput("199\n200\n208\n210\n200\n207\n240\n269\n260\n263");
  expect(part1(input)).toBe(7);
});

test("part 2", () => {
  const input = asInput("607\n618\n618\n617\n647\n716\n769\n792");
  expect(part2(input)).toBe(5);
});
