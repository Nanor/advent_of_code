import { asMoons, simulate, part2 } from "../src/day12";
import { asInput } from "../src/input";

describe("day12", () => {
  test("example 1", () => {
    const input =
      "<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>";
    const moons = asMoons(asInput(input));

    expect(simulate(moons, 10)).toBe(179);
  });

  test("example 2", () => {
    const input =
      "<x=-8, y=-10, z=0>\n<x=5, y=5, z=10>\n<x=2, y=-7, z=3>\n<x=9, y=-8, z=-3>";
    const moons = asMoons(asInput(input));

    expect(simulate(moons, 100)).toBe(1940);
  });

  test("example 3", () => {
    const input =
      "<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>";

    expect(part2(asInput(input))).toBe(2772);
  });

  test("example 4", () => {
    const input =
      "<x=-8, y=-10, z=0>\n<x=5, y=5, z=10>\n<x=2, y=-7, z=3>\n<x=9, y=-8, z=-3>";

    expect(part2(asInput(input))).toBe(4686774924);
  });
});
