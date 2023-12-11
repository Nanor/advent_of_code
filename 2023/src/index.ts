import { argv } from "bun";
import getInput, { type Input } from "./input";

const day = argv[2];

const input = await getInput(day);
const code: { part1?: (i: Input) => unknown; part2?: (i: Input) => unknown } =
  await import(`./days/day${day}`);

if (code.part1) {
  console.log(code.part1(input));
}
if (code.part2) {
  console.log(code.part2(input));
}
