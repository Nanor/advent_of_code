import Grid from "../common/Grid";
import HashSet from "../common/HashSet";
import aStar from "../common/aStar";

interface Blizzard extends Vec2 {
  dir: number;
}

class Blizzards extends HashSet<Blizzard, number> {
  hash(t: Blizzard): number {
    return t.x * 10000 + t.y * 10 + t.dir;
  }

  hasAny(t: Vec2): boolean {
    const hash = this.hash({ ...t, dir: 0 });

    return (
      this.map.has(hash) ||
      this.map.has(hash + 1) ||
      this.map.has(hash + 2) ||
      this.map.has(hash + 3)
    );
  }

  forEach(t: (value: Blizzard) => void) {
    return this.map.forEach(t);
  }
}

class SnowGrid extends Grid<boolean> {
  height: number;
  blizzards: Blizzards;

  constructor(
    w: number,
    h: number,
    grid: Map<number, boolean>,
    blizzards: Blizzards
  ) {
    super(w);
    this.height = h;
    if (grid) {
      this.grid = grid;
    }
    this.blizzards = blizzards;
  }

  static fromInput(input: Input): SnowGrid {
    const grid = input.asGrid();

    const snowGrid = new SnowGrid(
      grid[0].length,
      grid.length,
      undefined,
      new Blizzards()
    );

    grid.forEach((l, y) =>
      l.forEach((c, x) => {
        snowGrid.set({ x, y }, c === "#");

        if (c.match(/[<>^v]/)) {
          snowGrid.blizzards.add({ x, y, dir: "<>^v".indexOf(c) });
        }
      })
    );

    return snowGrid;
  }

  step() {
    const newBlizzards = new Blizzards();
    this.blizzards.forEach((b) => {
      const nbs: Record<Blizzard["dir"], Blizzard> = {
        0: { ...b, x: b.x - 1 },
        1: { ...b, x: b.x + 1 },
        2: { ...b, y: b.y - 1 },
        3: { ...b, y: b.y + 1 },
      };
      let nb = nbs[b.dir];

      if (nb.x === 0) nb = { ...nb, x: this.width - 2 };
      if (nb.x === this.width - 1) nb = { ...nb, x: 1 };
      if (nb.y === 0) nb = { ...nb, y: this.height - 2 };
      if (nb.y === this.height - 1) nb = { ...nb, y: 1 };

      newBlizzards.add(nb);
    });

    return new SnowGrid(this.width, this.height, this.grid, newBlizzards);
  }
}

const grids: SnowGrid[] = [];
let w: number;
let h: number;

const getAtTime = (t: number): SnowGrid => {
  if (!grids[t]) {
    grids[t] = getAtTime(t - 1).step();
  }
  return grids[t];
};

export const load = (input: Input) => {
  const snowGrid = SnowGrid.fromInput(input);
  w = snowGrid.width;
  h = snowGrid.height;

  grids[0] = snowGrid;
};

const solve = (
  start: { x: number; y: number; t: number },
  end: { x: number; y: number }
) =>
  aStar(
    start,
    (t) => t.t * w * h + t.x * h + t.y,
    (t) => {
      return [
        { ...t, t: t.t + 1 },
        { ...t, x: t.x + 1, t: t.t + 1 },
        { ...t, x: t.x - 1, t: t.t + 1 },
        { ...t, y: t.y + 1, t: t.t + 1 },
        { ...t, y: t.y - 1, t: t.t + 1 },
      ]
        .filter(({ x, y, t }) => {
          const grid = getAtTime(t);
          return (
            grid.has({ x, y }) &&
            !grid.get({ x, y }) &&
            !grid.blizzards.hasAny({ x, y })
          );
        })
        .map((t) => ({ node: t, cost: 1 }));
    },
    (t) => t.x === end.x && t.y === end.y,
    (t) => Math.abs(t.x - end.x) + Math.abs(t.y - end.y)
  ).node.t;

export const part1 = () => solve({ x: 1, y: 0, t: 0 }, { x: w - 2, y: h - 1 });

export const part2 = () => {
  const start = { x: 1, y: 0 };
  const end = { x: w - 2, y: h - 1 };

  const leg1 = solve({ ...start, t: 0 }, end);
  const leg2 = solve({ ...end, t: leg1 }, start);
  const leg3 = solve({ ...start, t: leg2 }, end);

  return leg3;
};
