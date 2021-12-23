import { part1, part2 } from "../src/days/day23";
import { asInput } from "../src/input";

const input1 = asInput(
  `
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
`.trim()
);

test("part 1", () => expect(part1(input1)).toBe(12521));
test("part 2", () => expect(part2(input1)).toBe(44169));
