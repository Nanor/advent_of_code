import { asInput } from "../src/input";
import { part1, part2 } from "../src/day11";

describe("day11", () => {
  const input = asInput(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`);

  test("part1", () => {
    expect(part1(input)).toBe(37);
  });

  test("part2", () => {
    expect(part2(input)).toBe(26);
  });
});
