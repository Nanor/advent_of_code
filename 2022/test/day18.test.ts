import { part1, part2 } from "../src/days/day18";
import { asInput } from "../src/input";

const input = asInput(`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`);

test("part 1", () => {
  expect(part1(input)).toBe(64);
});

test("part 2", () => {
  expect(part2(input)).toBe(58);
});
