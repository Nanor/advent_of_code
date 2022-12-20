import { part1, part2 } from "../src/days/day19";
import { asInput } from "../src/input";

const input = asInput(`
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`);

test("part 1", () => {
  expect(part1(input)).toBe(33);
});
