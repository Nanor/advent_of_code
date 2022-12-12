import { load, part1, part2 } from "../src/days/day12";
import { asInput } from "../src/input";

const input = asInput(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`);

beforeAll(() => {
  load(input);
});

test("part 1", () => {
  expect(part1()).toBe(31);
});

test("part 2", () => {
  expect(part2()).toBe(29);
});
