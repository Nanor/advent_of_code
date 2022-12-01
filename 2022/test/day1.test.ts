import { part1, part2 } from "../src/days/day1";
import { asInput } from "../src/input";

const input = asInput(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`);

test("part 1", () => {
  expect(part1(input)).toBe(24000);
});

test("part 2", () => {
  expect(part2(input)).toBe(45000);
});
