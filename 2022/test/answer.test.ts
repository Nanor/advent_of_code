import getInput, { Input } from "../src/input";
import * as days from "../src/days";

const answers = [
  [69626, 206780],
  [15523, 15702],
  [8123, 2620],
  [475, 825],
  ["WCZTHTMPS", "BLSGJSDTS"],
  [1134, 2263],
  [1350966, 6296435],
  [1845, 230112],
  [5878, 2405],
  [
    15260,
    `
###...##..#..#.####..##..#....#..#..##..
#..#.#..#.#..#.#....#..#.#....#..#.#..#.
#..#.#....####.###..#....#....#..#.#....
###..#.##.#..#.#....#.##.#....#..#.#.##.
#....#..#.#..#.#....#..#.#....#..#.#..#.
#.....###.#..#.#.....###.####..##...###.
`,
  ],
  [110264, 23612457316],
  [534, 525],
  [6428, 22464],
];

describe("all results", () => {
  answers.map(([r1, r2], i) => {
    const code = days[`day${i + 1}`];

    test(`day ${i + 1}`, async () => {
      const input = await getInput(i + 1);

      if ("load" in code) {
        code.load(input);
      }

      expect(code.part1(input)).toBe(r1);
      expect(code.part2(input)).toBe(r2);
    });
  });
});
