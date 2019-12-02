import { Input } from "./types";

const runProgram = (input: number[]): number[] => {
  let data = [...input];
  let index = 0;
  while (true) {
    const op = data[index];
    if (op === 99) {
      return data;
    }

    const pos1 = data[index + 1];
    const pos2 = data[index + 2];
    const pos3 = data[index + 3];
    const val1 = data[pos1];
    const val2 = data[pos2];

    const val3 = op === 1 ? val1 + val2 : val1 * val2;

    data[pos3] = val3;
    index += 4;
  }
};

export const part1 = (input: Input) => {
  const data = input.asNumberArray();
  data[1] = 12;
  data[2] = 2;

  return runProgram(data)[0];
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  for (let i = 0; i < 10000; i++) {
    data[1] = Math.floor(i / 100);
    data[2] = i % 100;

    const result = runProgram(data)[0];

    if (result === 19690720) {
      return i;
    }
  }
};
