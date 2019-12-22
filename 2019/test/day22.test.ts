import { asInput } from "../src/input";
import { shuffle } from "../src/day22";

describe("day22", () => {
  describe("part1", () => {
    const inst1 =
      "deal with increment 7\ndeal into new stack\ndeal into new stack";
    const inst2 = "cut 6\ndeal with increment 7\ndeal into new stack";
    const inst3 = "deal with increment 7\ndeal with increment 9\ncut -2";
    const inst4 =
      "deal into new stack\ncut -2\ndeal with increment 7\ncut 8\ncut -4\ndeal with increment 7\ncut 3\ndeal with increment 9\ndeal with increment 3\ncut -1";

    const res1 = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7];
    const res2 = [3, 0, 7, 4, 1, 8, 5, 2, 9, 6];
    const res3 = [6, 3, 0, 7, 4, 1, 8, 5, 2, 9];
    const res4 = [9, 2, 5, 8, 1, 4, 7, 0, 3, 6];

    test("example 1", () => {
      expect(shuffle(asInput(inst1), 10)).toStrictEqual(res1);
    });

    test("example 2", () => {
      expect(shuffle(asInput(inst2), 10)).toStrictEqual(res2);
    });

    test("example 3", () => {
      expect(shuffle(asInput(inst3), 10)).toStrictEqual(res3);
    });

    test("example 4", () => {
      expect(shuffle(asInput(inst4), 10)).toStrictEqual(res4);
    });
  });
});
