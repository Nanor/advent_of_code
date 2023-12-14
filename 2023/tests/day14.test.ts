import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day14";

const input = asInput(`
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`);

test("part1", () => {
  expect(part1(input)).toBe(136);
});

test("part2", () => {
  expect(part2(input)).toBe(64);
});
