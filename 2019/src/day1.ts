import { Input } from "./types";

const calcFuel = (n: number) => Math.floor(n / 3) - 2;

const calcFuelRepeat = (n: number) => {
  let fuel = 0;
  let mass = n;

  while (mass > 0) {
    const newFuel = calcFuel(mass);
    mass = newFuel;

    if (newFuel > 0) {
      fuel += newFuel;
    }
  }

  return fuel;
};

export const part1 = (input: Input) =>
  input
    .asNumbers()
    .map(calcFuel)
    .reduce((acc, n) => acc + n);

export const part2 = (input: Input) =>
  input
    .asNumbers()
    .map(calcFuelRepeat)
    .reduce((acc, n) => acc + n);
