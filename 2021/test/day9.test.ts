import { part1, part2 } from "../src/days/day9";
import { asInput } from "../src/input";

const input = asInput(
  `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim()
);

test("part 1", () => {
  expect(part1(input)).toBe(15);
});

test("part 2", () => {
  expect(part2(input)).toBe(1134);
});
