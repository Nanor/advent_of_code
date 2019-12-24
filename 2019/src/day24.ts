import { Input } from "./input";

enum Tile {
  Alive = "#",
  Dead = "."
}

type Grid = Tile[][];

const biodiversity = (grid: Grid) => {
  let b = 0;
  grid.forEach((l, y) =>
    l.forEach((t, x) => (b += t === Tile.Alive ? 2 ** (y * 5 + x) : 0))
  );
  return b;
};

const tileAt = (grid: Grid, x: number, y: number): Tile => {
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
    return grid[y][x];
  }
  return Tile.Dead;
};

const adjacent = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

const evolve = (grid: Grid): Grid =>
  grid.map((l, y) =>
    l.map((t, x) => {
      const ns = adjacent.filter(
        ([dx, dy]) => tileAt(grid, x + dx, y + dy) === Tile.Alive
      ).length;
      if (t === Tile.Alive) {
        return ns === 1 ? Tile.Alive : Tile.Dead;
      } else {
        return ns > 0 && ns < 3 ? Tile.Alive : Tile.Dead;
      }
    })
  );

export const part1 = (input: Input) => {
  let grid = input.asGrid() as Grid;
  const seen = [biodiversity(grid)];

  while (true) {
    grid = evolve(grid);
    const b = biodiversity(grid);
    if (seen.includes(b)) return b;

    seen.push(b);
  }
};

type Point = { x: number; y: number; z: number };

class Bugs {
  _bugs: { [x: string]: Point };

  constructor() {
    this._bugs = {};
  }

  add(p: Point) {
    this._bugs[JSON.stringify(p)] = p;
  }

  contains(p: Point): boolean {
    return JSON.stringify(p) in this._bugs;
  }

  remove(p: Point) {
    delete this._bugs[JSON.stringify(p)];
  }

  count() {
    return Object.keys(this._bugs).length;
  }

  forEach(f: any) {
    Object.values(this._bugs).forEach(f);
  }
}

const equal = (b1: Point, b2: Point) =>
  b1.x === b2.x && b1.y === b2.y && b1.z === b2.z;

const evolve2 = (bugs: Bugs): Bugs => {
  const neighbors = ({ x, y, z }: Point) => {
    const out: Point[] = [];

    adjacent.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && !(nx === 2 && ny === 2)) {
        out.push({ x: nx, y: ny, z });
      }
    });

    if (x === 0) out.push({ x: 1, y: 2, z: z - 1 });
    if (x === 4) out.push({ x: 3, y: 2, z: z - 1 });
    if (y === 0) out.push({ x: 2, y: 1, z: z - 1 });
    if (y === 4) out.push({ x: 2, y: 3, z: z - 1 });

    if (x === 1 && y === 2)
      out.push(...[...Array(5)].map((_, i) => ({ x: 0, y: i, z: z + 1 })));
    if (x === 3 && y === 2)
      out.push(...[...Array(5)].map((_, i) => ({ x: 4, y: i, z: z + 1 })));
    if (x === 2 && y === 1)
      out.push(...[...Array(5)].map((_, i) => ({ x: i, y: 0, z: z + 1 })));
    if (x === 2 && y === 3)
      out.push(...[...Array(5)].map((_, i) => ({ x: i, y: 4, z: z + 1 })));

    return out;
  };

  const toCheck = new Bugs();
  bugs.forEach(b => {
    toCheck.add(b);
    neighbors(b).forEach(b2 => toCheck.add(b2));
  });

  const out = new Bugs();

  toCheck.forEach(b1 => {
    const ns = neighbors(b1).filter(b2 => bugs.contains(b2)).length;

    if (bugs.contains(b1)) {
      if (ns === 1) out.add(b1);
    } else {
      if (ns === 1 || ns === 2) out.add(b1);
    }
  });

  return out;
};

export const part2 = (input: Input) => {
  let grid = input.asGrid() as Grid;
  let bugs = new Bugs();

  grid.forEach((l, y) =>
    l.forEach((t, x) => {
      if (t === Tile.Alive) bugs.add({ x, y, z: 0 });
    })
  );

  for (let n = 0; n < 200; n++) {
    bugs = evolve2(bugs);
  }

  return bugs.count();
};
