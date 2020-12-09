import { hack, findRange } from "../src/day9";

describe("day9", () => {
  const input = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
  ];

  test("part 1", () => {
    expect(hack(input, 5)).toBe(127);
  });

  test("part 2", () => {
    expect(findRange(input, 127)).toEqual([15, 25, 47, 40]);
  });
});
