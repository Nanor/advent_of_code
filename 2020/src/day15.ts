import { Input } from "./input";

export const game = (numbers: number[], end: number): number => {
  const ages = new Map();
  numbers.slice(0, numbers.length - 1).forEach((val, i) => {
    ages.set(val, i);
  });

  let t = numbers.length;
  let last = numbers[numbers.length - 1];
  while (t < end) {
    const newVal = ages.has(last) ? t - ages.get(last) - 1 : 0;
    ages.set(last, t - 1);

    last = newVal;
    t += 1;
  }

  return last;
};

export const part1 = (input: Input) => game(input.asNumberArray(), 2020);
export const part2 = (input: Input) => game(input.asNumberArray(), 30000000);
