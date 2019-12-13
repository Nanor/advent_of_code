import { Input } from "./input";
import intcode from "./Intcode";

export const part1 = (input: Input) => {
  const data = input.asNumberArray();
  data[1] = 12;
  data[2] = 2;

  return intcode(data).data[0];
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  for (let i = 0; i < 10000; i++) {
    data[1] = Math.floor(i / 100);
    data[2] = i % 100;

    const result = intcode(data).data[0];

    if (result === 19690720) {
      return i;
    }
  }
};
