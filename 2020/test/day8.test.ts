import { part1, part2 } from "../src/day8";
import { asInput } from "../src/input";

describe("day8", () => {
  test("part1", () => {
    const input = asInput(
      `nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6`
    );

    expect(part1(input)).toBe(5);
  });

  test("part2", () => {
    const input = asInput(
      `nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6`
    );

    expect(part2(input)).toBe(8);
  });
});
