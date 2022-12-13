import { part1, part2 } from "../src/days/day13";
import { asInput } from "../src/input";

const input = asInput(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`);

test("part 1", () => {
  expect(part1(input)).toBe(13);
});

test("part 2", () => {
  expect(part2(input)).toBe(140);
});
