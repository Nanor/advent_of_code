import { Input } from "../input";

export const part1 = (input: Input) => {
  let increases = 0;
  let lastDepth = null;
  input.asNumbers().forEach((depth) => {
    if (lastDepth && depth > lastDepth) increases += 1;

    lastDepth = depth;
  });

  return increases;
};

export const part2 = (input: Input) => {
  let increases = 0;
  let lastDepth = null;

  const depths = input.asNumbers();
  depths.forEach((depth, i) => {
    const depthSum = depths.slice(i, i + 3).reduce((x, y) => x + y);

    if (lastDepth && depthSum > lastDepth) increases += 1;

    lastDepth = depthSum;
  });

  return increases;
};
