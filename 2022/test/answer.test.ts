import getInput from "../src/input";
import * as days from "../src/days";

const answers = [[69626, 206780]];

describe("all results", () => {
  answers.forEach(([r1, r2], i) => {
    const code = days[`day${i + 1}`];

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
