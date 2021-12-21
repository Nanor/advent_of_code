import { part1, part2 } from "../src/days/day21";
import { asInput } from "../src/input";

const input = asInput(
  `
Player 1 starting position: 4
Player 2 starting position: 8
`.trim()
);

test("part 1", () => expect(part1(input)).toBe(739785));

test("part 2", () => expect(part2(input)).toBe(444356092776315));
