import { expect, test } from "bun:test";
import { asInput } from "../src/input";
import { hash, part1, part2 } from "../src/days/day15";

test("hash", () => {
  expect(hash("HASH")).toBe(52);
});

const input = asInput(`
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`);

test("part1", () => {
  expect(part1(input)).toBe(1320);
});

test("part2", () => {
  expect(part2(input)).toBe(145);
});
