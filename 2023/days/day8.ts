import { Input } from "../input";
import { lcm } from "../utils";

const parse = (input: Input) => {
  const [[ss], lines] = input.asParagraphs();

  const steps = ss.split("");

  const map = new Map<string, [string, string]>();

  lines.forEach((line) => {
    const [_, c, l, r] = line.match(/^(\w+) = \((\w+), (\w+)\)$/) || [];

    map.set(c, [l, r]);
  });

  return { steps, map };
};

export const part1 = (input: Input) => {
  const { steps, map } = parse(input);

  let current = "AAA";
  let i = 0;
  while (current !== "ZZZ") {
    const step = steps[i % steps.length];
    i += 1;
    current = map.get(current)![step === "L" ? 0 : 1];
  }

  return i;
};

export const part2 = (input: Input) => {
  const { steps, map } = parse(input);

  const getLoop = (start: string): number => {
    let current = start;
    let i = 0;
    while (true) {
      const step = steps[i % steps.length];
      i += 1;
      current = map.get(current)![step === "L" ? 0 : 1];

      if (current.endsWith("Z")) return i;
    }
  };

  return [...map.keys()]
    .filter((s) => s.endsWith("A"))
    .map(getLoop)
    .reduce(lcm);
};
