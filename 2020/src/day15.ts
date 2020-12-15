import { Input } from "./input";

export const game = (numbers: number[], end: number): number => {
  const ages = {};
  numbers.slice(0, numbers.length - 1).forEach((val, i) => {
    ages[val] = i;
  });

  let t = numbers.length;
  let last = numbers[numbers.length - 1];
  while (t < end) {
    const prev = ages[last];
    const newVal = prev === undefined ? 0 : t - prev - 1;

    ages[last] = t - 1;

    last = newVal;
    t += 1;

    // if (t % (end / 100) === 0) {
    //   console.log(t / end);
    // }
  }

  return last;
};

export const part1 = (input: Input) => game(input.asNumberArray(), 2020);
export const part2 = (input: Input) => game(input.asNumberArray(), 30000000);
