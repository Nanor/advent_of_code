import { part1, part2 } from "../src/days/day12";
import { asInput } from "../src/input";

const input1 = asInput(
  `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`.trim()
);

const input2 = asInput(
  `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`.trim()
);

const input3 = asInput(
  `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`.trim()
);

describe("part 1", () => {
  test("ex1", () => expect(part1(input1)).toBe(10));
  test("ex2", () => expect(part1(input2)).toBe(19));
  test("ex3", () => expect(part1(input3)).toBe(226));
});

describe("part 2", () => {
  test("ex1", () => expect(part2(input1)).toBe(36));
  test("ex2", () => expect(part2(input2)).toBe(103));
  test("ex3", () => expect(part2(input3)).toBe(3509));
});
