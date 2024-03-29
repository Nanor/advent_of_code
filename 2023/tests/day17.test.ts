import { describe, expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day17";

const input = asInput(`
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`);

test("part1", () => {
  expect(part1(input)).toBe(102);
});

describe("part2", () => {
  test("ex1", () => {
    expect(part2(input)).toBe(94);
  });

  test("ex2", () => {
    expect(
      part2(
        asInput(`
      111111111111
      999999999991
      999999999991
      999999999991
      999999999991
    `)
      )
    ).toBe(71);
  });
});
