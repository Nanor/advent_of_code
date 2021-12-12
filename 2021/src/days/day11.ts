import { Input } from "../input";

const print = (octos: number[][]) => {
  console.log(octos.map((l) => l.join("")).join("\n"));
};

const simulate = (
  octos: number[][]
): { octos: number[][]; flashes: number } => {
  octos.forEach((l, y) => l.forEach((o, x) => (octos[y][x] += 1)));

  let flashes = 0;
  let changed = true;
  while (changed) {
    changed = false;

    octos.forEach((l, y) =>
      l.forEach((o, x) => {
        if (o > 9) {
          changed = true;
          flashes += 1;

          octos[y][x] = undefined;

          [-1, 0, 1].forEach((dy) =>
            [-1, 0, 1].forEach((dx) => {
              if (octos[y + dy] && octos[y + dy][x + dx] !== undefined) {
                octos[y + dy][x + dx] += 1;
              }
            })
          );
        }
      })
    );
  }

  octos.forEach((l, y) => l.forEach((o, x) => (octos[y][x] = o || 0)));

  return { octos, flashes };
};

export const part1 = (input: Input) => {
  let octos = input.asNumberGrid();
  let flashes = 0;

  for (let t = 0; t < 100; t++) {
    let f: number;

    ({ octos, flashes: f } = simulate(octos));

    flashes += f;
  }

  return flashes;
};

export const part2 = (input: Input) => {
  let octos = input.asNumberGrid();
  let t = 1;

  while (true) {
    let flashes: number;

    ({ octos, flashes } = simulate(octos));

    if (flashes === 100) {
      return t;
    }
    t += 1;
  }
};
