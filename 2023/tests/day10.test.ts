import { describe, expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day10";

describe("part1", () => {
  test("ex1", () => {
    expect(
      part1(
        asInput(`-L|F7
    7S-7|
    L|7||
    -L-J|
    L|-JF`)
      )
    ).toBe(4);
  });

  test("ex2", () => {
    expect(
      part1(
        asInput(`7-F7-
    .FJ|7
    SJLL7
    |F--J
    LJ.LJ`)
      )
    ).toBe(8);
  });
});

describe("part2", () => {
  test("ex1", () => {
    expect(
      part2(
        asInput(`...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........`)
      )
    ).toBe(4);
  });

  test("ex2", () => {
    expect(
      part2(
        asInput(`.F----7F7F7F7F-7....
    .|F--7||||||||FJ....
    .||.FJ||||||||L7....
    FJL7L7LJLJ||LJ.L-7..
    L--J.L7...LJS7F-7L7.
    ....F-J..F7FJ|L7L7L7
    ....L7.F7||L7|.L7L7|
    .....|FJLJ|FJ|F7|.LJ
    ....FJL-7.||.||||...
    ....L---J.LJ.LJLJ...`)
      )
    ).toBe(8);
  });

  test("ex3", () => {
    expect(
      part2(
        asInput(`FF7FSF7F7F7F7F7F---7
    L|LJ||||||||||||F--J
    FL-7LJLJ||||||LJL-77
    F--JF--7||LJLJ7F7FJ-
    L---JF-JLJ.||-FJLJJ7
    |F|F-JF---7F7-L7L|7|
    |FFJF7L7F-JF7|JL---7
    7-L-JL7||F7|L7F-7F7|
    L.L7LFJ|||||FJL7||LJ
    L7JLJL-JLJLJL--JLJ.L`)
      )
    ).toBe(10);
  });
});
