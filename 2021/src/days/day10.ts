import { Input } from "../input";

const simplify = (input: Input): string[] => {
  const lines = input.asLines();
  return lines.map((l) => {
    let curr = l;
    let last = undefined;

    while (curr !== last) {
      last = curr;
      curr = curr.replace(/(\[\])|(\(\))|(\{\})|(\<\>)/g, "");
    }

    return curr;
  });
};

export const part1 = (input: Input) => {
  const POINTS = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const lines = simplify(input);

  return lines.reduce((acc, l) => {
    const m = l.match(/[)\]>}]/);
    return acc + (m ? POINTS[m[0]] : 0);
  }, 0);
};

export const part2 = (input: Input) => {
  const POINTS = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };

  const lines = simplify(input);
  const points = lines
    .filter((l) => !l.match(/[)\]>}]/))
    .map((l) => l.split("").reduceRight((acc, c) => acc * 5 + POINTS[c], 0));

  points.sort((a, b) => a - b);

  return points[(points.length - 1) / 2];
};
