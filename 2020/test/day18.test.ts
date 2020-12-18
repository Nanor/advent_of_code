import { evaluate1, evaluate2 } from "./../src/day18";

describe("day18", () => {
  describe("part1", () => {
    test("ex1", () => expect(evaluate1("1 + 2 * 3 + 4 * 5 + 6")).toBe(71));
    test("ex2", () => expect(evaluate1("1 + (2 * 3) + (4 * (5 + 6))")).toBe(51));
    test("ex3", () => expect(evaluate1("2 * 3 + (4 * 5)")).toBe(26));
    test("ex4", () =>
      expect(evaluate1("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toBe(437));
    test("ex5", () =>
      expect(evaluate1("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toBe(
        12240
      ));
    test("ex6", () =>
      expect(evaluate1("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")).toBe(
        13632
      ));
  });

  describe("part2", () => {
    test("ex1", () => expect(evaluate2("1 + 2 * 3 + 4 * 5 + 6")).toBe(231));
    test("ex2", () => expect(evaluate2("1 + (2 * 3) + (4 * (5 + 6))")).toBe(51));
    test("ex3", () => expect(evaluate2("2 * 3 + (4 * 5)")).toBe(46));
    test("ex4", () =>
      expect(evaluate2("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toBe(1445));
    test("ex5", () =>
      expect(evaluate2("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toBe(
        669060
      ));
    test("ex6", () =>
      expect(evaluate2("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")).toBe(
        23340
      ));
  });
});
