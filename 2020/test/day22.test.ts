import { part1, part2 } from "../src/day22";
import { asInput } from "../src/input";

describe("day22", () => {
  const input = asInput(`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`);

  test("part1", () => {
    expect(part1(input)).toBe(306);
  });

  test("part2", () => {
    expect(part2(input)).toBe(291);
  });
});
