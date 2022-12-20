import { part1, part2 } from "../src/days/day20";
import { asInput } from "../src/input";

const input = asInput(`1
2
-3
3
-2
0
4
`);

test("part 1", () => {
  expect(part1(input)).toBe(3);
});

test("part 2", () => {
  expect(part2(input)).toBe(1623178306);
});
