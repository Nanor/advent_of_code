import { asInput } from "../src/input";
import { part1, part2 } from "../src/day16";

describe("day16", () => {
  describe("part1", () => {
    test("example1", () => {
      expect(part1(asInput("12345678"))).toBe("23845678");
    });

    test("example2", () => {
      expect(part1(asInput("80871224585914546619083218645595"))).toBe(
        "24176176"
      );
    });

    test("example3", () => {
      expect(part1(asInput("19617804207202209144916044189917"))).toBe(
        "73745418"
      );
    });

    test("example4", () => {
      expect(part1(asInput("69317163492948606335995924319873"))).toBe(
        "52432133"
      );
    });
  });

  describe("part2", () => {
    test("example1", () => {
      expect(part2(asInput("03036732577212944063491565474664"))).toBe(
        "84462026"
      );
    });

    test("example2", () => {
      expect(part2(asInput("02935109699940807407585447034323"))).toBe(
        "78725270"
      );
    });

    test("example3", () => {
      expect(part2(asInput("03081770884921959731165446850517"))).toBe(
        "53553731"
      );
    });
  });
});
