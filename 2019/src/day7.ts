import { Input } from "./input";
import intcode, { run } from "./Intcode";

export const permutations = (arr: number[]): number[][] => {
  if (arr.length === 1) {
    return [arr];
  }

  const out = [];

  arr.forEach((el: number, i: number) => {
    const rest = [...arr];
    rest.splice(i, 1);

    out.push(...permutations(rest).map((x: number[]) => [el, ...x]));
  });

  return out;
};

export const run1 = (data: number[], settings: number[]): number => {
  let output = 0;
  settings.forEach((s, i) => {
    output = intcode(data, [s, output]).output[0];
  });

  return output;
};

export const run2 = (data: number[], settings: number[]): number => {
  const computers = settings.map(s => intcode(data, [s]));

  let curr = 0;
  let value = 0;

  while (true) {
    const currComp = computers[curr];
    const nextComp = run({ ...currComp, input: [value], output: [] });
    computers[curr] = nextComp;

    value = nextComp.output[0];

    if (curr === 4 && nextComp.halted) {
      break;
    }

    curr = (curr + 1) % 5;
  }

  return value;
};

export const part1 = (input: Input) => {
  const data = input.asNumberArray();
  let max = 0;

  permutations([0, 1, 2, 3, 4]).forEach(settings => {
    const res = run1(data, settings);
    max = Math.max(res, max);
  });

  return max;
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();
  let max = 0;

  permutations([5, 6, 7, 8, 9]).forEach(settings => {
    const res = run2(data, settings);
    max = Math.max(res, max);
  });

  return max;
};
