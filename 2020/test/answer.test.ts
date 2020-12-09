import getInput from "../src/input";

const answers = [
  [927684, 292093004],
  [418, 616],
  [247, 2983070376],
  [228, 175],
  [864, 739],
  [6763, 3512],
  [155, 54803],
  [1489, 1539],
  [15353384, 2466556],
];

describe("all results", () => {
  answers.forEach(([r1, r2], i) => {
    const code = require(`../src/day${i + 1}`);
    if (r1) {
      test(`day ${i + 1} part 1`, async () => {
        const input = await getInput(i + 1);
        expect(code.part1(input)).toBe(r1);
      });
    }
    if (r2) {
      test(`day ${i + 1} part 2`, async () => {
        const input = await getInput(i + 1);
        expect(code.part2(input)).toBe(r2);
      });
    }
  });
});
