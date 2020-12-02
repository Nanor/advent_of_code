import { part2 } from "../src/day2";
import { asInput } from "../src/input";

test("day2 examples", () => {
  const input = asInput("1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc");
  expect(part2(input)).toBe(1);
});
