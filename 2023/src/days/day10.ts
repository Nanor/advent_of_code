import { Grid } from "../grid";
import { Input } from "../input";

const genLoop = function* (grid: Grid) {
  const checked = new Set<number>();

  let curr = grid.indexOf("S")!;

  while (true) {
    yield curr;

    const value = grid.get(curr);

    const newValue = [
      { x: curr.x, y: curr.y - 1, toOptions: "|F7", fromOptions: "S|LJ" },
      { x: curr.x, y: curr.y + 1, toOptions: "|LJ", fromOptions: "S|F7" },
      { x: curr.x - 1, y: curr.y, toOptions: "-LF", fromOptions: "S-7J" },
      { x: curr.x + 1, y: curr.y, toOptions: "-7J", fromOptions: "S-LF" },
    ]
      .filter(({ x, y }) => !checked.has(y * grid.width + x))
      .filter(
        (v) =>
          v.fromOptions.includes(value!) && v.toOptions.includes(grid.get(v)!)
      )[0];

    if (!newValue) return;

    checked.add(newValue.y * grid.width + newValue.x);

    curr = newValue;
  }
};

export const part1 = (input: Input) => [...genLoop(input.asGrid())].length / 2;

export const part2 = (input: Input) => {
  const grid = input.asGrid();

  const modulus = grid.width + 1;

  const loop = [...genLoop(grid)].map(({ x, y }) => y * modulus + x);
  const loopObject = Object.fromEntries(loop.map((i, j) => [i, j]));

  const toCheck = new Set([0]);
  const checked = new Set<number>();

  while (toCheck.size) {
    const currentIndex = toCheck.values().next().value;
    toCheck.delete(currentIndex);

    if (checked.has(currentIndex)) continue;
    checked.add(currentIndex);

    const x = currentIndex % modulus;
    const y = Math.floor(currentIndex / modulus);

    if (x < grid.width) {
      if (
        Math.abs(
          loopObject[(y - 1) * modulus + x] - loopObject[y * modulus + x]
        ) %
          (loop.length - 2) !==
        1
      ) {
        toCheck.add(y * modulus + (x + 1));
      }
    }
    if (x >= 1) {
      if (
        Math.abs(
          loopObject[(y - 1) * modulus + x - 1] -
            loopObject[y * modulus + x - 1]
        ) %
          (loop.length - 2) !==
        1
      ) {
        toCheck.add(y * modulus + (x - 1));
      }
    }
    if (y < grid.height) {
      if (
        Math.abs(
          loopObject[y * modulus + x - 1] - loopObject[y * modulus + x]
        ) %
          (loop.length - 2) !==
        1
      ) {
        toCheck.add((y + 1) * modulus + x);
      }
    }
    if (y >= 1) {
      if (
        Math.abs(
          loopObject[(y - 1) * modulus + x - 1] -
            loopObject[(y - 1) * modulus + x]
        ) %
          (loop.length - 2) !==
        1
      ) {
        toCheck.add((y - 1) * modulus + x);
      }
    }
  }

  loop.forEach((v) => checked.add(v));

  return (grid.width + 1) * (grid.height + 1) - checked.size;
};
