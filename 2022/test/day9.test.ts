import { part1, part2 } from "../src/days/day9";
import { asInput } from "../src/input";

const input = asInput(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`);

test("part 1", () => {
  expect(part1(input)).toBe(13);
});

describe("part 2", () => {
  test("ex 1", () => {
    expect(part2(input)).toBe(1);
  });

  test("ex 2", () => {
    expect(
      part2(
        asInput(`R 5
    U 8
    L 8
    D 3
    R 17
    D 10
    L 25
    U 20`)
      )
    ).toBe(36);
  });
});
