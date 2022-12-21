import { part1, part2 } from "../src/days/day21";
import { asInput } from "../src/input";

const input = asInput(`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`);

test("part 1", () => {
  expect(part1(input)).toBe(152);
});

test("part 2", () => {
  expect(part2(input)).toBe(301);
});
