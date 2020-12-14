import { asInput } from "../src/input";
import { part1, part2 } from "../src/day14";

describe("day11", () => {
  test("part1", () => {
    const input = asInput(`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0`);

    expect(part1(input)).toBe(165);
  });

  test("part2", () => {
    const input = asInput(`mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1`);

    expect(part2(input)).toBe(208);
  });
});
