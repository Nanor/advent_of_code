import { load, part1, part2 } from "../src/days/day24";
import { asInput } from "../src/input";

const input = asInput(`#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`);

beforeEach(() => {
  load(input);
});

test("part 1", () => {
  expect(part1()).toBe(18);
});

test("part 2", () => {
  expect(part2()).toBe(54);
});
