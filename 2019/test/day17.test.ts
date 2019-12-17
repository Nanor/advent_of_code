import { asInput } from "../src/input";
import { part2, getPath, breakPath, makeMain } from "../src/day17";

describe("day17", () => {
  const input =
    "#######...#####\n#.....#...#...#\n#.....#...#...#\n......#...#...#\n......#...###.#\n......#.....#.#\n^########...#.#\n......#.#...#.#\n......#########\n........#...#..\n....#########..\n....#...#......\n....#...#......\n....#...#......\n....#####......";
  const grid = asInput(input.trim()).asGrid();

  describe("part2", () => {
    test("getPath", () => {
      expect(getPath(grid).join(",")).toBe(
        "R,8,R,8,R,4,R,4,R,8,L,6,L,2,R,4,R,4,R,8,R,8,R,8,L,6,L,2"
      );
    });

    test("makeMain", () => {
      expect(
        makeMain(getPath(grid), {
          A: ["R", "8", "R", "8"],
          B: ["R", "4", "R", "4", "R", "8"],
          C: ["L", "6", "L", "2"]
        })
      ).toStrictEqual(["A", "B", "C", "B", "A", "C"]);
    });

    test("breakPath", () => {
      expect(breakPath(getPath(grid))).toStrictEqual({
        main: ["A", "A", "B", "B", "C", "B", "B", "A", "A", "C"],
        A: ["R", "8"],
        B: ["R", "4"],
        C: ["R", "8", "L", "6", "L", "2"]
      });
    });
  });
});
