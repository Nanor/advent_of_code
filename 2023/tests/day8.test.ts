import { describe, expect, test } from "bun:test";
import { asInput } from "../input";
import { part1, part2 } from "../days/day8";

describe("part1", () => {
  test("ex1", () => {
    expect(
      part1(
        asInput(`RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`)
      )
    ).toBe(2);
  });

  test("ex2", () => {
    expect(
      part1(
        asInput(`LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)`)
      )
    ).toBe(6);
  });
});

test("part2", () => {
  expect(
    part2(
      asInput(`LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`)
    )
  ).toBe(6);
});
