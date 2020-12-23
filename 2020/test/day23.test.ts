import { part1, part2 } from "../src/day23";
import { asInput } from "../src/input";

describe("day23", () => {
  const cups = asInput("389125467");
  describe("part1", () => {
    test("ex1", () => expect(part1(cups, 10)).toBe("92658374"));
    test("ex2", () => expect(part1(cups, 100)).toBe("67384529"));
  });

  describe("part2", () => {
    test("ex1", () => expect(part2(cups)).toBe(149245887792));
  });
});
