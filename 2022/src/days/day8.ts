import { Input } from "../input";

type Tree = { height: number; visible: boolean };

const dirs = ["N", "E", "S", "W"] as const;
type Dir = typeof dirs[number];

class Forest {
  private trees: Map<number, Tree>;
  width: number;
  height: number;

  constructor(grid: number[][]) {
    this.height = grid.length;
    this.width = grid[0].length;

    this.trees = new Map();

    grid.forEach((r, y) =>
      r.forEach((height, x) => this.set(x, y, { height, visible: false }))
    );
  }

  private toIndex(x: number, y: number) {
    return x + y * this.width;
  }

  set(x: number, y: number, v: Tree) {
    this.trees.set(this.toIndex(x, y), v);
  }

  get(x: number, y: number): Tree {
    return this.trees.get(this.toIndex(x, y));
  }

  values() {
    return Array.from(this.trees.values());
  }

  trace(x: number, y: number, dir: Dir): Tree[] {
    let cx = x;
    let cy = y;

    const move = {
      N: () => (cy -= 1),
      S: () => (cy += 1),
      E: () => (cx += 1),
      W: () => (cx -= 1),
    }[dir];

    const output: Tree[] = [];

    while (!(cx < 0 || cx >= this.width || cy < 0 || cy >= this.height)) {
      output.push(this.get(cx, cy));
      move();
    }

    return output;
  }
}

export const part1 = (input: Input) => {
  const forest = new Forest(input.asNumberGrid());

  const check = (ts: Tree[]) => {
    let maxHeight = -1;

    ts.forEach((tree) => {
      if (tree.height > maxHeight) {
        tree.visible = true;
        maxHeight = tree.height;
      }
    });
  };

  for (let y = 0; y < forest.height; y++) {
    check(forest.trace(0, y, "E"));
    check(forest.trace(forest.width - 1, y, "W"));
  }

  for (let x = 0; x < forest.width; x++) {
    check(forest.trace(x, 0, "S"));
    check(forest.trace(x, forest.height - 1, "N"));
  }

  return forest.values().filter((t) => t.visible).length;
};

export const part2 = (input: Input) => {
  const forest = new Forest(input.asNumberGrid());

  let maxScore = -1;

  [...Array(forest.height)].forEach((_, y) =>
    [...Array(forest.width)].forEach((_, x) => {
      const tree = forest.get(x, y);

      const dists = dirs.map((d) => {
        const trees = forest.trace(x, y, d);

        for (let i = 1; i < trees.length; i++) {
          if (trees[i].height >= tree.height) return i;
        }

        return trees.length - 1;
      });

      const score = dists.reduce((a, b) => a * b, 1);

      maxScore = Math.max(score, maxScore);
    })
  );

  return maxScore;
};
