import { Input } from "../input";

const digits = {
  2: 2,
  1: 1,
  0: 0,
  "-": -1,
  "=": -2,
};
const unDigits = {
  2: 2,
  1: 1,
  0: 0,
  "-1": "-",
  "-2": "=",
};

const sna2Dec = (s: string): number =>
  s
    .split("")
    .reverse()
    .map((v, i) => digits[v] * Math.pow(5, i))
    .reduce((a, x) => a + x, 0);

const dec2Sna = (n: number): string => {
  let out: string[] = [];

  while (n) {
    const r = n % 5;
    const digit = r > 2 ? r - 5 : r;
    out.unshift(unDigits[digit]);

    n = (n - digit) / 5;
  }

  return out.join("");
};

export const part1 = (input: Input) =>
  dec2Sna(
    input
      .asLines()
      .map((s) => sna2Dec(s))
      .reduce((x, a) => x + a, 0)
  );
