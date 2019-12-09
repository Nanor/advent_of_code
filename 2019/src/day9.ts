import { Input } from "./types";
import intcode from "./Intcode";

export const part1 = (input: Input) => {
  const data = input.asNumberArray();

  return intcode(data, [1]).output[0];
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  return intcode(data, [2]).output[0];
};
