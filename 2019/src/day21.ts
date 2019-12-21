import { Input } from "./input";
import intcode, { withInput } from "./Intcode";

const print = (output: number[]) => {
  let out = "";
  output.forEach(c => {
    out += String.fromCharCode(c);
  });
  console.log(out);
};

const ascii = (
  prog: number[],
  input: string[],
  output: boolean = false
): number => {
  let comp = intcode(prog);

  if (output) {
    print(comp.output);
  }

  comp = withInput(
    comp,
    `${input.join("\n")}\n`.split("").map(c => c.charCodeAt(0))
  );

  if (output) {
    print(comp.output);
  }

  return comp.output[comp.output.length - 1];
};

export const part1 = (input: Input) => {
  const data = input.asNumberArray();

  const inputLines = [
    "NOT A J", // There's a hole 1 away
    "NOT B T", // Or 2 away
    "OR T J",
    "NOT C T", // Or 3 away
    "OR T J",
    "AND D J", // And ground 4 away
    "WALK"
  ];

  return ascii(data, inputLines, false);
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  const inputLines = [
    "NOT A J", // There's a hole 1 away
    "NOT B T", // Or 2 away
    "OR T J",
    "NOT C T", // Or 3 away
    "OR T J",
    "AND D J", // And ground 4 away
    "AND E T", // T = ground 5 away
    "OR H T", // T = ground 5 away or 8 away
    "AND T J",
    "RUN"
  ];

  return ascii(data, inputLines, false);
};
