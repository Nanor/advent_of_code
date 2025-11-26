import Grid from "../common/Grid";
import breadthFirstSearch from "../common/breadthFirstSearch";
import { Input } from "../input";
import { Vec2 } from "../types";

const letters = "abcdefghijklmnopqrstuvwxyz";

interface Cell extends Vec2 {
  height: number;
  distance?: number;
}

class Mountain extends Grid<Cell> {
  start: Cell;
  end: Cell;

  constructor(input: Input) {
    const grid = input.asGrid().filter((x) => x.length > 0);

    super(grid[0].length);

    grid.forEach((r, y) =>
      r.forEach((c, x) => {
        if (c === "S") {
          this.start = { x, y, height: 0 };
          this.set({ x, y }, this.start);
          return;
        }
        if (c === "E") {
          this.end = { x, y, height: 25 };
          this.set({ x, y }, this.end);
          return;
        }

        this.set({ x, y }, { x, y, height: letters.indexOf(c) });
      })
    );
  }

  solve() {
    const searched = breadthFirstSearch(
      this.end,
      (a) => this.hash(a),
      (curr) => {
        const { x, y } = curr;
        return [
          { x, y: y - 1 },
          { x, y: y + 1 },
          { x: x - 1, y },
          { x: x + 1, y },
        ]
          .map((c) => this.get(c))
          .filter((next) => next && next.height >= curr.height - 1)
          .map((c) => ({ node: c, cost: 1 }));
      }
    );

    searched.forEach(({ node, cost }) => {
      node.distance = cost;
    });
  }
}

let mountain: Mountain;

export const load = (input: Input) => {
  mountain = new Mountain(input);
  mountain.solve();
};

export const part1 = () => {
  return mountain.start.distance;
};

export const part2 = () => {
  const starts = Array.from(mountain.values()).filter(
    (c) => c.height === 0 && c.distance
  );

  starts.sort((a, b) => a.distance - b.distance);

  return starts[0].distance;
};
