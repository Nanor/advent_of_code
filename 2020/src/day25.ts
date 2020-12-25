import { Input } from "./input";

const mod = 20201227;

const getLoop = (publicCode: number): number => {
  let loop = 0;
  let val = 1;

  while (val !== publicCode) {
    val = (val * 7) % mod;
    loop += 1;
  }

  return loop;
};

export const hack = (card: number, door: number): number => {
  const cardLoop = getLoop(card);
  const doorLoop = getLoop(door);

  let val = 1;
  for (let i = 0; i < cardLoop; i++) {
    val = (val * door) % mod;
  }

  return val;
};

export const part1 = (input: Input) => {
  const [card, door] = input.asNumbers();

  return hack(card, door);
};
