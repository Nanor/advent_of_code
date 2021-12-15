import { part1, part2 } from "../src/days/day15";
import { asInput } from "../src/input";

const input = asInput(
  `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`.trim()
);

test("part 1", () => {
  expect(part1(input)).toBe(40);
});

test("part 2", () => {
  expect(part2(input)).toBe(315);
});
