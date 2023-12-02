import { part1, part2 } from "../src/days/day7";
import { asInput } from "../src/input";

const input = asInput(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`);

test("part 1", () => {
  expect(part1(input)).toBe(95437);
});

test("part 2", () => {
  expect(part2(input)).toBe(24933642);
});