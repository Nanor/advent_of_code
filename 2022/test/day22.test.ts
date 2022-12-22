import { part1, part2 } from "../src/days/day22";
import { asInput } from "../src/input";

const input = asInput(`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`);

test("part 1", () => {
  expect(part1(input)).toBe(6032);
});
