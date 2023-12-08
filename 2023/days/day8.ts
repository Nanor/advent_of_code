import { Input } from "../input";
import { lcm } from "../utils";

const parse = (input: Input) => {
  const [[steps], lines] = input.asParagraphs();

  const map = new Map<string, [string, string]>();
  lines.forEach((line) => {
    const [_, c, l, r] = line.match(/^(\w+) = \((\w+), (\w+)\)$/) || [];
    map.set(c, [l, r]);
  });

  return {
    steps: steps.split("").map((s) => (s === "L" ? 0 : 1)),
    map,
  };
};

const getLoop = (
  start: string,
  steps: (0 | 1)[],
  map: Map<string, [string, string]>
): number => {
  let current = start;
  let i = 0;
  while (current[2] !== "Z") {
    const step = steps[i++ % steps.length];
    current = map.get(current)![step];
  }

  return i;
};

export const part1 = (input: Input) => {
  const { steps, map } = parse(input);

  return getLoop("AAA", steps, map);
};

export const part2 = (input: Input) => {
  const { steps, map } = parse(input);

  return [...map.keys()]
    .filter((s) => s[2] === "A")
    .map((s) => getLoop(s, steps, map))
    .reduce(lcm);
};
