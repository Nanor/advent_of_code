import type { Input } from "../input";
import type { Coord } from "../utils";

type Cell = "." | "|" | "-" | "\\" | "/";
type Dir = "L" | "R" | "U" | "D";
type Beam = Coord & { dir: Dir };

const countEnergised = (grid: Cell[][], start: Beam) => {
  const width = grid[0].length;
  const height = grid.length;

  const energised = grid.map((line) => line.map(() => false));
  const allBeams: { [d: string]: boolean }[][] = grid.map((line) =>
    line.map(() => ({}))
  );

  const beams: Beam[] = [start];

  while (beams.length) {
    const beam = beams.pop()!;

    switch (beam.dir) {
      case "L":
        beam.x -= 1;
        break;
      case "R":
        beam.x += 1;
        break;
      case "U":
        beam.y -= 1;
        break;
      case "D":
        beam.y += 1;
        break;
    }

    if (beam.x < 0 || beam.x >= width || beam.y < 0 || beam.y >= height)
      continue;

    const char = grid[beam.y][beam.x];

    const newBeams: Beam[] = [];

    if (
      char === "." ||
      (char === "-" && (beam.dir === "L" || beam.dir === "R")) ||
      (char === "|" && (beam.dir === "U" || beam.dir === "D"))
    ) {
      newBeams.push(beam);
    } else if (
      (char === "/" && beam.dir === "R") ||
      (char === "\\" && beam.dir === "L")
    ) {
      newBeams.push({ ...beam, dir: "U" });
    } else if (
      (char === "/" && beam.dir === "L") ||
      (char === "\\" && beam.dir === "R")
    ) {
      newBeams.push({ ...beam, dir: "D" });
    } else if (
      (char === "/" && beam.dir === "D") ||
      (char === "\\" && beam.dir === "U")
    ) {
      newBeams.push({ ...beam, dir: "L" });
    } else if (
      (char === "/" && beam.dir === "U") ||
      (char === "\\" && beam.dir === "D")
    ) {
      newBeams.push({ ...beam, dir: "R" });
    } else if (char === "-") {
      newBeams.push({ ...beam, dir: "L" }, { ...beam, dir: "R" });
    } else if (char === "|") {
      newBeams.push({ ...beam, dir: "U" }, { ...beam, dir: "D" });
    }

    newBeams.forEach((b) => {
      if (!allBeams[b.y][b.x][b.dir]) {
        allBeams[b.y][b.x][b.dir] = true;
        energised[b.y][b.x] = true;
        beams.push(b);
      }
    });
  }

  return energised.flat().filter(Boolean).length;
};

export const part1 = (input: Input) => {
  const grid = input.asCharGrid() as Cell[][];
  const start = { x: -1, y: 0, dir: "R" } as const;

  return countEnergised(grid, start);
};

export const part2 = (input: Input) => {
  const grid = input.asCharGrid() as Cell[][];
  const width = grid[0].length;
  const height = grid.length;

  let max = 0;

  for (let x = 0; x < width; x++) {
    max = Math.max(
      max,
      countEnergised(grid, { x, y: -1, dir: "D" }),
      countEnergised(grid, { x, y: height, dir: "U" })
    );
  }
  for (let y = 0; y < height; y++) {
    max = Math.max(
      max,
      countEnergised(grid, { x: -1, y, dir: "R" }),
      countEnergised(grid, { x: width, y, dir: "L" })
    );
  }

  return max;
};
