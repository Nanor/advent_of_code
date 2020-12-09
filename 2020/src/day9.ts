import { builtinModules } from "module";
import { Input } from "./input";

export const hack = (data: number[], length: number) => {
  for (let i = length; i < data.length; i++) {
    const prevs = data.slice(i - length, i);
    let valid = false;

    for (let j of prevs) {
      for (let k of prevs) {
        if (j + k === data[i]) {
          valid = true;
        }
      }
    }

    if (!valid) {
      return data[i];
    }
  }
};

export const findRange = (data: number[], target: number) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      const numbers = data.slice(i, j);
      const sum = numbers.reduce((x, y) => x + y, 0);

      if (sum === target) {
        return numbers;
      }
      if (sum > target) {
        break;
      }
    }
  }
};

export const part1 = (input: Input) => hack(input.asNumbers(), 25);
export const part2 = (input: Input) => {
  const data = input.asNumbers();
  const target = hack(data, 25);
  const range = findRange(data, target);

  return Math.min(...range) + Math.max(...range);
};
