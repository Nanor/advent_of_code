import { Heap } from "@datastructures-js/heap";
import type { Input } from "../input";
import { Coord, Dir } from "../utils";

type State = Coord & {
  dir: Dir;
  steps: number;
  index: string;
};

const toIndex = (s: Omit<State, "index">): string =>
  `${s.x},${s.y},${s.dir},${s.steps}`;

const solve = (
  input: Input,
  isValidNeighbour: (s: State, d: Dir) => boolean
) => {
  const grid = input.asNumberGrid();

  const goalX = grid[0].length - 1;
  const goalY = grid.length - 1;

  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};

  const partial = { x: 0, y: 0, dir: "D", steps: 0 } as const;
  const start = { ...partial, index: toIndex(partial) };

  gScore[start.index] = 0;
  fScore[start.index] = goalX + goalY;

  const openSet = new Heap<State>((a, b) => fScore[a.index] - fScore[b.index]);
  openSet.insert(start);

  const directions = [
    [1, 0, "R"],
    [-1, 0, "L"],
    [0, 1, "D"],
    [0, -1, "U"],
  ] as const;

  while (true) {
    const current = openSet.extractRoot()!;

    if (
      current.x === goalX &&
      current.y === goalY &&
      isValidNeighbour(current, "D") &&
      isValidNeighbour(current, "R")
    ) {
      return gScore[current.index];
    }

    directions.forEach(([dx, dy, dir]) => {
      if (!isValidNeighbour(current, dir)) return;
      if (
        (dir === "U" && current.dir === "D") ||
        (dir === "D" && current.dir === "U") ||
        (dir === "L" && current.dir === "R") ||
        (dir === "R" && current.dir === "L")
      )
        return;

      const newX = current.x + dx;
      const newY = current.y + dy;
      if (newX < 0 || newX > goalX || newY < 0 || newY > goalY) return;

      const steps = dir === current.dir ? current.steps + 1 : 1;

      const partial = { x: newX, y: newY, dir, steps };
      const newState = { ...partial, index: toIndex(partial) };

      const newScore = gScore[current.index] + grid[newY][newX];
      if (newScore < (gScore[newState.index] ?? Infinity)) {
        gScore[newState.index] = newScore;
        fScore[newState.index] = newScore + (goalX - newX + (goalY - newY));

        openSet.insert(newState);
      }
    });
  }
};

export const part1 = (input: Input) =>
  solve(input, (current, dir) => current.steps < 3 || dir !== current.dir);

export const part2 = (input: Input) =>
  solve(input, (current, dir) => {
    if (current.steps === 0) return true;
    if (current.steps < 4) {
      return current.dir === dir;
    }
    if (current.steps >= 10) {
      return current.dir !== dir;
    }
    return true;
  });
