import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day22";

const input = asInput(`
1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9
`);

test("part1", () => {
  expect(part1(input)).toBe(5);
});

test("part2", () => {
  expect(part2(input)).toBe(7);
});
