import { Input } from "./input";

export const part1 = (input: Input) => {
  const numbers = input.asNumbers();

  let out;

  numbers.forEach((n1, i) =>
    numbers.slice(i).forEach((n2) => {
      if (n1 + n2 === 2020) {
        out = n1 * n2;
      }
    })
  );

  return out;
};

export const part2 = (input: Input) => {
  const numbers = input.asNumbers();

  let out;

  numbers.forEach((n1, i) =>
    numbers.slice(i).forEach((n2, j) => {
      numbers.slice(j).forEach((n3) => {
        if (n1 + n2 + n3 === 2020) {
          out = n1 * n2 * n3;
        }
      });
    })
  );

  return out;
};
