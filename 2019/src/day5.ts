import { Input } from "./types";
import intcode from "./Intcode";

export const part1 = (input: Input) => {
  const data = input.asNumberArray();

  intcode(data, [1]);
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  intcode(data, [5]);
};
