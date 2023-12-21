import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1 } from "../src/days/day21";

test("part1", () => {
  const input = asInput(`
    ...........
    .....###.#.
    .###.##..#.
    ..#.#...#..
    ....#.#....
    .##..S####.
    .##..#...#.
    .......##..
    .##.#.####.
    .##..##.##.
    ...........
  `);

  expect(part1(input, 6)).toBe(16);
});
