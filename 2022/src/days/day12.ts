import { Input } from "../input";

const letters = "abcdefghijklmnopqrstuvwxyz";

type Cell = {
  x: number;
  y: number;
  height: number;
  distance?: number;
};

class Mountain {
  cells: Map<number, Cell>;
  height: number;
  width: number;
  start: Cell;
  end: Cell;

  constructor(input: Input) {
    this.cells = new Map();

    const grid = input.asGrid().filter((x) => x.length > 0);

    this.width = grid[0].length;
    this.height = grid.length;

    grid.forEach((r, y) =>
      r.forEach((c, x) => {
        if (c === "S") {
          this.start = { x, y, height: 0 };
          this.set(x, y, this.start);
          return;
        }
        if (c === "E") {
          this.end = { x, y, height: 25 };
          this.set(x, y, this.end);
          return;
        }

        this.set(x, y, { x, y, height: letters.indexOf(c) });
      })
    );
  }

  set(x: number, y: number, c: Cell) {
    this.cells.set(x + y * this.width, c);
  }

  get(x: number, y: number) {
    return this.cells.get(x + y * this.width);
  }

  solve() {
    this.end.distance = 0;
    const toCheck = [this.end];

    while (toCheck.length > 0) {
      toCheck.sort((a, b) => a.distance - b.distance);

      const { x, y } = toCheck.shift();
      const curr = this.get(x, y);

      [
        { x, y: y - 1 },
        { x, y: y + 1 },
        { x: x - 1, y },
        { x: x + 1, y },
      ].forEach((c) => {
        const next = this.get(c.x, c.y);

        if (
          next &&
          next.height >= curr.height - 1 &&
          (next.distance === undefined || next.distance > curr.distance + 1)
        ) {
          next.distance = curr.distance + 1;
          toCheck.push(next);
        }
      });
    }
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
  const starts = Array.from(mountain.cells.values()).filter(
    (c) => c.height === 0 && c.distance
  );

  starts.sort((a, b) => a.distance - b.distance);

  return starts[0].distance;
};
