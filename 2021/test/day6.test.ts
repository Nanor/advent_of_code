import { parse, simulate } from "../src/days/day6";
import { asInput } from "../src/input";

const input = parse(asInput("3,4,3,1,2"));

test("part 1", () => {
  expect(simulate(input, 18)).toBe(26);
  expect(simulate(input, 80)).toBe(5934);
});

test("part 2", () => {
  expect(simulate(input, 256)).toBe(26984457539);
});
