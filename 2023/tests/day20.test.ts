import { describe, expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1 } from "../src/days/day20";

describe("part1", () => {
  test("ex1", () => {
    expect(
      part1(
        asInput(`
          broadcaster -> a, b, c
          %a -> b
          %b -> c
          %c -> inv
          &inv -> a
        `)
      )
    ).toBe(32000000);
  });

  test("ex2", () => {
    expect(
      part1(
        asInput(`
          broadcaster -> a
          %a -> inv, con
          &inv -> b
          %b -> con
          &con -> output
        `)
      )
    ).toBe(11687500);
  });
});
