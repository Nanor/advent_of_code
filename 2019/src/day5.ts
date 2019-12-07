import { Input } from "./types";
import intcode from "./Intcode";

export const part1 = (input: Input) => {
  const data = input.asNumberArray();

  const { output } = intcode(data, [1]);

  return output[output.length - 1];
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  const { output } = intcode(data, [5]);

  return output[output.length - 1];
};
