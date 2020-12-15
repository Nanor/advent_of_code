import { asInput } from "../src/input";
import { game } from "../src/day15";

describe("day15", () => {
  describe("part1", () => {
    test("ex1", () => expect(game([0, 3, 6], 2020)).toBe(436));
    test("ex2", () => expect(game([1, 3, 2], 2020)).toBe(1));
    test("ex3", () => expect(game([2, 1, 3], 2020)).toBe(10));
    test("ex4", () => expect(game([1, 2, 3], 2020)).toBe(27));
    test("ex5", () => expect(game([2, 3, 1], 2020)).toBe(78));
    test("ex6", () => expect(game([3, 2, 1], 2020)).toBe(438));
    test("ex7", () => expect(game([3, 1, 2], 2020)).toBe(1836));
  });

  // describe("part2", () => {
  //   test("ex1", () => expect(game([0, 3, 6], 30000000)).toBe(175594));
  //   test("ex2", () => expect(game([1, 3, 2], 30000000)).toBe(2578));
  //   test("ex3", () => expect(game([2, 1, 3], 30000000)).toBe(3544142));
  //   test("ex4", () => expect(game([1, 2, 3], 30000000)).toBe(261214));
  //   test("ex5", () => expect(game([2, 3, 1], 30000000)).toBe(6895259));
  //   test("ex6", () => expect(game([3, 2, 1], 30000000)).toBe(18));
  //   test("ex7", () => expect(game([3, 1, 2], 30000000)).toBe(362));
  // });
});
