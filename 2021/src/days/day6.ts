import { Input } from "../input";

type Fish = { [age: number]: number };

export const parse = (input: Input): Fish => {
  let fish: Fish = {};

  input.asNumberArray().forEach((f) => {
    fish[f] = (fish[f] || 0) + 1;
  });

  return fish;
};

export const simulate = (fish: Fish, time: number): number => {
  for (let i = 0; i < time; i++) {
    let newFish: Fish = {};

    Object.entries(fish).map(([age, count]) => {
      if (age === "0") {
        newFish[8] = (newFish[8] || 0) + count;
        newFish[6] = (newFish[6] || 0) + count;
        return;
      }

      newFish[parseInt(age) - 1] = (newFish[parseInt(age) - 1] || 0) + count;
    });

    fish = newFish;
  }

  return Object.values(fish).reduce((x, y) => x + y);
};

export const part1 = (input: Input) => {
  let fish = parse(input);
  return simulate(fish, 80);
};

export const part2 = (input: Input) => {
  let fish = parse(input);
  return simulate(fish, 256);
};
