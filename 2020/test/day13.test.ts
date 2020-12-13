import { asInput } from "../src/input";
import { part1, part2 } from "../src/day13";

describe("day11", () => {
  test("part1", () => {
    const input = asInput(`939
  7,13,x,x,59,x,31,19`);

    expect(part1(input)).toBe(295);
  });

  describe("part2", () => {
    test("ex1", () => expect(part2(asInput("\n17,x,13,19"))).toBe(3417));
    test("ex2", () => expect(part2(asInput("\n67,7,59,61"))).toBe(754018));
    test("ex3", () => expect(part2(asInput("\n67,x,7,59,61"))).toBe(779210));
    test("ex4", () => expect(part2(asInput("\n67,7,x,59,61"))).toBe(1261476));
    test("ex5", () =>
      expect(part2(asInput("\n1789,37,47,1889"))).toBe(1202161486));
  });
});
