import { asInput } from "../src/input";
import { part1, part2 } from "../src/day18";

describe("day18", () => {
  describe("part1", () => {
    const maze1 = "#########\n#b.A.@.a#\n#########";
    const maze2 =
      "########################\n#f.D.E.e.C.b.A.@.a.B.c.#\n######################.#\n#d.....................#\n########################";
    const maze3 =
      "########################\n#...............b.C.D.f#\n#.######################\n#.....@.a.B.c.d.A.e.F.g#\n########################";
    const maze4 =
      "#################\n#i.G..c...e..H.p#\n########.########\n#j.A..b...f..D.o#\n########@########\n#k.E..a...g..B.n#\n########.########\n#l.F..d...h..C.m#\n#################";
    const maze5 =
      "########################\n#@..............ac.GI.b#\n###d#e#f################\n###A#B#C################\n###g#h#i################\n########################";

    test("example 1", () => expect(part1(asInput(maze1))).toBe(8));
    test("example 2", () => expect(part1(asInput(maze2))).toBe(86));
    test("example 3", () => expect(part1(asInput(maze3))).toBe(132));
    test("example 4", () => expect(part1(asInput(maze4))).toBe(136));
    test("example 5", () => expect(part1(asInput(maze5))).toBe(81));
  });

  describe("part2", () => {
    const maze1 =
      "#######\n#a.#Cd#\n##...##\n##.@.##\n##...##\n#cB#Ab#\n#######";
    const maze2 =
      "###############\n#d.ABC.#.....a#\n######...######\n######.@.######\n######...######\n#b.....#.....c#\n###############";
    const maze3 =
      "#############\n#DcBa.#.GhKl#\n#.###...#I###\n#e#d#.@.#j#k#\n###C#...###J#\n#fEbA.#.FgHi#\n#############";

    test("example 1", () => expect(part2(asInput(maze1))).toBe(8));
    test("example 2", () => expect(part2(asInput(maze2))).toBe(24));
    test("example 3", () => expect(part2(asInput(maze3))).toBe(32));
  });
});
