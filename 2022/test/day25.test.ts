import { part1 } from "../src/days/day25";
import { asInput } from "../src/input";

const input = asInput(`1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122
`);

test("part 1", () => {
  expect(part1(input)).toBe("2=-1=0");
});
