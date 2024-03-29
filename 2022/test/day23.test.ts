import { part1, part2 } from "../src/days/day23";
import { asInput } from "../src/input";

const input = asInput(`..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............
`);

test("part 1", () => {
  expect(part1(input)).toBe(110);
});

test("part 2", () => {
  expect(part2(input)).toBe(20);
});
