import { describe, expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, solve } from "../src/days/day11";

const input = asInput(`
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`);

test("part1", () => {
  expect(part1(input)).toBe(374);
});

describe("part2", () => {
  test("ex1", () => {
    expect(solve(input, 10)).toBe(1030);
  });
  test("ex2", () => {
    expect(solve(input, 100)).toBe(8410);
  });
});
