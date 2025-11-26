import Grid from "../common/Grid";
import { Input } from "../input";

type Tree = { height: number; visible: boolean };

const dirs = ["N", "E", "S", "W"] as const;
type Dir = typeof dirs[number];

class Forest extends Grid<Tree> {
  readonly height: number;

  constructor(input: Input) {
    const grid = input.asNumberGrid();

    super(grid[0].length);
    this.height = grid.length;

    grid.forEach((line, y) =>
      line.forEach((t, x) => this.set({ x, y }, { height: t, visible: false }))
    );
  }
}

const trace = (forest: Forest, x: number, y: number, dir: Dir): Tree[] => {
  let cx = x;
  let cy = y;

  const move = {
    N: () => (cy -= 1),
    S: () => (cy += 1),
    E: () => (cx += 1),
    W: () => (cx -= 1),
  }[dir];

  const output: Tree[] = [];

  while (!(cx < 0 || cx >= forest.width || cy < 0 || cy >= forest.height)) {
    output.push(forest.get({ x: cx, y: cy }));
    move();
  }

  return output;
};

export const part1 = (input: Input) => {
  const forest = new Forest(input);

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
    check(trace(forest, 0, y, "E"));
    check(trace(forest, forest.width - 1, y, "W"));
  }

  for (let x = 0; x < forest.width; x++) {
    check(trace(forest, x, 0, "S"));
    check(trace(forest, x, forest.height - 1, "N"));
  }

  return forest.values().filter((t) => t.visible).length;
};

export const part2 = (input: Input) => {
  const forest = new Forest(input);

  let maxScore = -1;

  [...Array(forest.height)].forEach((_, y) =>
    [...Array(forest.width)].forEach((_, x) => {
      const tree = forest.get({ x, y });

      const dists = dirs.map((d) => {
        const trees = trace(forest, x, y, d);

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
