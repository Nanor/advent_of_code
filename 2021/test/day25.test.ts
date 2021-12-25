import { part1 } from "../src/days/day25";
import { asInput } from "../src/input";

const input = asInput(
  `
v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>
`.trim()
);

test("part 1", () => expect(part1(input)).toBe(58));
