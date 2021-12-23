import { Input } from "../input";

type Pos = {
  x: number;
  y: number;
};

type Pod = Pos & {
  id: number;
  letter: string;
};

type State = {
  energy: number;
  pods: Pod[];
  depth: number;
};

enum Tile {
  Wall = "#",
  Empty = " ",
}

const rooms = { A: 3, B: 5, C: 7, D: 9 };
const costs = { A: 1, B: 10, C: 100, D: 1000 };

const getPath = (a: Pos, b: Pos): Pos[] => {
  const out = [];

  for (let y = a.y; y !== 1; y--) {
    out.push({ x: a.x, y });
  }
  for (let x = a.x; x !== b.x; x += Math.sign(b.x - a.x)) {
    out.push({ x, y: 1 });
  }
  for (let y = 1; y !== b.y; y++) {
    out.push({ x: b.x, y });
  }
  out.push(b);

  return out
    .reduce<Pos[]>((acc, a) => {
      const i = acc.findIndex((v) => v.x === a.x && v.y === a.y);

      if (i >= 0) {
        return [...acc.slice(0, i), a];
      }
      return [...acc, a];
    }, [])
    .filter((v) => !(v.x === a.x && v.y === a.y));
};

const pathBlocked = (path: Pos[], pods: Pod[]) =>
  path.some((pos) => pods.some((pod) => pos.x === pod.x && pos.y === pod.y));

const solve = (tiles: Pos[], initPods: Pod[], maxHeight: number) => {
  const states: State[] = [{ pods: initPods, energy: 0, depth: 0 }];

  while (states.length) {
    states.sort((a, b) => a.energy - b.energy);

    const { pods, energy, depth } = states.shift();

    if (pods.every((p) => p.y !== 1 && p.x === rooms[p.letter])) {
      return energy;
    }

    pods.forEach((pod) => {
      // Don't leave the correct room if you're done
      if (
        pod.x === rooms[pod.letter] &&
        pods.filter(
          (p) => p.y > pod.y && p.x === pod.x && p.letter === pod.letter
        ).length ===
          maxHeight - pod.y
      )
        return;

      // Can't move if there's pods above you
      if (pods.some((p) => p.y < pod.y && p.x === pod.x)) return;

      tiles.forEach(({ x, y }) => {
        // Will never move hallway to hallway
        if (pod.y === 1 && y === 1) return;

        if (pod.x === x) return;

        if (
          !(
            (x <= rooms[pod.letter] && x <= pod.x) ||
            (x >= rooms[pod.letter] && x >= pod.x)
          )
        )
          return;

        if (y === 1 && Object.values(rooms).includes(x))
          // Won't stop outside of rooms
          return;

        // Won't enter a room that's not theirs
        if (y !== 1 && x !== rooms[pod.letter]) return;

        // Won't enter a room with different pods in
        if (y !== 1 && pods.some((p) => p.letter !== pod.letter && p.x === x))
          return;

        // Always go all the way into a room
        if (
          y !== 1 &&
          pods.filter((p) => p.y > y && p.x === x).length !== maxHeight - y
        )
          return;

        const path = getPath(pod, { x, y });

        if (pathBlocked(path, pods)) return;

        const cost = costs[pod.letter] * path.length;
        const newEnergy = energy + cost;

        const newPods = [
          ...pods.filter((p) => p.id !== pod.id),
          { ...pod, x, y },
        ];

        if (
          !states.some(
            (s) =>
              s.energy <= newEnergy &&
              s.pods.every((p) =>
                newPods.some(
                  (p2) => p.letter === p2.letter && p.x === p2.x && p.y === p2.y
                )
              )
          )
        )
          states.push({ pods: newPods, energy: newEnergy, depth: depth + 1 });
      });
    });
  }
};

const parse = (grid: string[][]) => {
  const initPods: Pod[] = [];
  const map = grid.map((l, y) =>
    l.map((c, x) => {
      if (c === "#") return Tile.Wall;

      if (c.match(/[ABCD]/)) {
        initPods.push({ letter: c, x, y, id: initPods.length });
        return Tile.Empty;
      }

      if (c === ".") return Tile.Empty;
    })
  );

  const tiles: Pos[] = map
    .flatMap((l, y) =>
      l.map((c, x) => (c === Tile.Empty ? { x, y } : undefined))
    )
    .filter(Boolean);

  return { initPods, tiles };
};

export const part1 = (input: Input) => {
  const grid = input.asGrid();
  const { initPods, tiles } = parse(grid);

  return solve(tiles, initPods, 3);
};

export const part2 = (input: Input) => {
  const extra = ["  #D#C#B#A#", "  #D#B#A#C#"];

  const lines = input.asLines();
  lines.splice(3, 0, ...extra);
  const grid = lines.map((l) => l.split(""));

  const { initPods, tiles } = parse(grid);

  return solve(tiles, initPods, 5);
};
