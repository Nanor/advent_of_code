import { Input } from "./types";
import intcode from "./Intcode";

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
  const outputs = [0];
  settings.forEach((s, i) => {
    const { output } = intcode(data, [s, outputs[i]]);
    outputs.push(output[0]);
  });

  return outputs[5];
};

export const run2 = (data: number[], settings: number[]): number => {
  const inputs = settings.map(s => [s]);
  inputs[0].push(0);

  let curr = 0;

  while (true) {
    const { output, halt } = intcode(data, inputs[curr]);

    inputs[(curr + 1) % 5].push(output[output.length - 1]);

    if (curr === 4 && halt) {
      break;
    }

    curr = (curr + 1) % 5;
  }

  return inputs[0][inputs[0].length - 1];
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
