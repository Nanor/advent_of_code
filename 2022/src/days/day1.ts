import { Input } from "../input";

export const part1 = (input: Input) => {
  let maxCalories = 0;
  let currentCalories = 0;

  input.asNumbers().forEach((num) => {
    if (isNaN(num)) {
      maxCalories = Math.max(maxCalories, currentCalories);
      currentCalories = 0;
      return;
    }

    currentCalories += num;
  });

  maxCalories = Math.max(maxCalories, currentCalories);

  return maxCalories;
};

export const part2 = (input: Input) => {
  const calories: number[] = [];
  let currentCalories = 0;

  input.asNumbers().forEach((num) => {
    if (isNaN(num)) {
      calories.push(currentCalories);
      currentCalories = 0;
      return;
    }

    currentCalories += num;
  });
  calories.push(currentCalories);

  calories.sort((a, b) => b - a);

  return calories.slice(0, 3).reduce((a, x) => a + x, 0);
};
