import { part1, part2 } from "../src/days/day5";
import { asInput } from "../src/input";

const input = asInput(
  "0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2"
);

test("part 1", () => {
  expect(part1(input)).toBe(5);
});

test("part 2", () => {
  expect(part2(input)).toBe(12);
});
