import { describe, expect, test } from "bun:test";
import getInput from "../input";

describe.each([...Array(25)].map((_, i) => i + 1))("", async (day) => {
  try {
    const code = await import(`../days/day${day}`);
    const input = await getInput(day.toString());

    describe(`day ${day}`, () => {
      test.if(code.part1)("part 1", () => {
        expect(code.part1(input)).toMatchSnapshot();
      });
      test.if(code.part2)("part 2", () => {
        expect(code.part2(input)).toMatchSnapshot();
      });
    });
  } catch {}
});
