import { split, part1, part2 } from "../src/day24";
import { asInput } from "../src/input";

describe("expect(part2(input,24", () => {
  test("split", () => {
    expect(split("sesenwnenenewseeswwswswwnenewsewsw")).toEqual([
      "se",
      "se",
      "nw",
      "ne",
      "ne",
      "ne",
      "w",
      "se",
      "e",
      "sw",
      "w",
      "sw",
      "sw",
      "w",
      "ne",
      "ne",
      "w",
      "se",
      "w",
      "sw",
    ]);
  });

  const input = asInput(`sesenwnenenewseeswwswswwnenewsewsw
  neeenesenwnwwswnenewnwwsewnenwseswesw
  seswneswswsenwwnwse
  nwnwneseeswswnenewneswwnewseswneseene
  swweswneswnenwsewnwneneseenw
  eesenwseswswnenwswnwnwsewwnwsene
  sewnenenenesenwsewnenwwwse
  wenwwweseeeweswwwnwwe
  wsweesenenewnwwnwsenewsenwwsesesenwne
  neeswseenwwswnwswswnw
  nenwswwsewswnenenewsenwsenwnesesenew
  enewnwewneswsewnwswenweswnenwsenwsw
  sweneswneswneneenwnewenewwneswswnese
  swwesenesewenwneswnwwneseswwne
  enesenwswwswneneswsenwnewswseenwsese
  wnwnesenesenenwwnenwsewesewsesesew
  nenewswnwewswnenesenwnesewesw
  eneswnwswnwsenenwnwnwwseeswneewsenese
  neswnwewnwnwseenwseesewsenwsweewe
  wseweeenwnesenwwwswnew`);

  test("part1", () => {
    expect(part1(input)).toBe(10);
  });

  test("part2", () => {
    expect(part2(input, 1)).toBe(15);
    expect(part2(input, 2)).toBe(12);
    expect(part2(input, 3)).toBe(25);
    expect(part2(input, 4)).toBe(14);
    expect(part2(input, 5)).toBe(23);
    expect(part2(input, 6)).toBe(28);
    expect(part2(input, 7)).toBe(41);
    expect(part2(input, 8)).toBe(37);
    expect(part2(input, 9)).toBe(49);
    expect(part2(input, 10)).toBe(37);

    expect(part2(input, 20)).toBe(132);
    expect(part2(input, 30)).toBe(259);
    expect(part2(input, 40)).toBe(406);
    expect(part2(input, 50)).toBe(566);
    expect(part2(input, 60)).toBe(788);
    expect(part2(input, 70)).toBe(1106);
    expect(part2(input, 80)).toBe(1373);
    expect(part2(input, 90)).toBe(1844);
    expect(part2(input, 100)).toBe(2208);
  });
});
