import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day16";

const input = asInput(`
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`);

test("part1", () => {
  expect(part1(input)).toBe(46);
});

test("part2", () => {
  expect(part2(input)).toBe(51);
});
