import { Input } from "./types";
import intcode from "./Intcode";

export const part1 = (input: Input) => {
  // console.log(intcode([1, 0, 0, 0, 99]));
  // console.log(intcode([2, 3, 0, 3, 99]));
  // console.log(intcode([2, 4, 4, 5, 99, 0]));
  // console.log(intcode([1, 1, 1, 4, 99, 5, 6, 0, 99]));

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
