import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { part1, part2 } from "../src/days/day1";

test("part1", () => {
  const input = asInput(`1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`);

  expect(part1(input)).toBe(142);
});

test("part2 ex1", () => {
  const input = asInput(`two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`);

  expect(part2(input)).toBe(281);
});

test("part2 ex2", () => {
  const input = asInput(`sevensrncljm5zmvvrtthreejjd85twonepvj`);

  expect(part2(input)).toBe(71);
});
