import { describe, expect, test } from "bun:test";
import getInput from "../src/input";

describe.each([...Array(25)].map((_, i) => i + 1))("", async (day) => {
  try {
    const code = await import(`../src/days/day${day}`);
    const input = await getInput(day.toString());

    describe(`day ${day}`, () => {
      if (code.part1) {
        test("part 1", () => {
          expect(code.part1(input)).toMatchSnapshot();
        });
      }
      if (code.part2) {
        test("part 2", () => {
          expect(code.part2(input)).toMatchSnapshot();
        });
      }
    });
  } catch {}
});
