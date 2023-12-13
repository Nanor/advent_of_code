import { Input } from "../input";
import { sum } from "../utils";

const getMirror = (
  getter: (x: number, y: number) => string,
  width: number,
  height: number,
  smudge: boolean
): number => {
  const checkLine = (x: number) => {
    const maxX = Math.min(x + 1, width - x - 1);
    let smudged = false;

    for (let y = 0; y < height; y++) {
      for (let j = 0; j < maxX; j++) {
        if (getter(x - j, y) !== getter(x + 1 + j, y)) {
          if (smudged) return false;

          smudged = true;
        }
      }
    }
    return smudge === smudged;
  };

  for (let i = 0; i < width - 1; i++) {
    if (checkLine(i)) return i + 1;
  }

  return 0;
};

const solve = (input: Input, smudge: boolean) =>
  input
    .asParagraphs()
    .map((lines) => {
      const grid = lines.map((line) => line.split(""));

      return (
        getMirror((x, y) => grid[y][x], grid[0].length, grid.length, smudge) ||
        getMirror((x, y) => grid[x][y], grid.length, grid[0].length, smudge) *
          100
      );
    })
    .reduce(sum);

export const part1 = (input: Input) => solve(input, false);
export const part2 = (input: Input) => solve(input, true);
