import { Input } from "../input";

enum Material {
  Rock = 1,
  Sand = 2,
}

class Grid {
  private _grid: Map<number, Material>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  constructor(input: Input) {
    this._grid = new Map();

    this.minY = 0;
    this.maxY = 0;
    this.minX = Infinity;
    this.maxX = 0;

    input
      .asLines()
      .filter(Boolean)
      .forEach((line) => {
        let cx = undefined;
        let cy = undefined;
        line.split(" -> ").forEach((s) => {
          const [x, y] = s.split(",").map((n) => parseInt(n));

          if (cx !== undefined && x !== cx) {
            for (let dx = cx; dx !== x; dx += Math.sign(x - cx)) {
              this.set(dx, y, Material.Rock);
            }
          }
          if (cy !== undefined && y !== cy) {
            for (let dy = cy; dy !== y; dy += Math.sign(y - cy)) {
              this.set(x, dy, Material.Rock);
            }
          }
          cx = x;
          cy = y;
          this.set(cx, cy, Material.Rock);

          this.minX = Math.min(this.minX, x);
          this.maxX = Math.max(this.maxX, x);
          this.minY = Math.min(this.minY, y);
          this.maxY = Math.max(this.maxY, y);

          return;
        });
      });
  }

  private toIndex(x: number, y: number) {
    return x * 10000 + y;
  }

  set(x: number, y: number, v: Material) {
    this._grid.set(this.toIndex(x, y), v);
  }

  get(x: number, y: number): Material {
    return this._grid.get(this.toIndex(x, y));
  }

  has(x: number, y: number): Boolean {
    return this._grid.has(this.toIndex(x, y));
  }

  values() {
    return Array.from(this._grid.values());
  }

  drop(path: { x: number; y: number }[]) {
    while (path.length > 0) {
      const { x, y } = path[path.length - 1];

      if (y > this.maxY + 10) return undefined;

      if (this.has(x, y)) {
        path.pop();
        continue;
      }

      if (!this.has(x, y + 1)) {
        path.push({ x, y: y + 1 });
      } else if (!this.has(x - 1, y + 1)) {
        path.push({ x: x - 1, y: y + 1 });
      } else if (!this.has(x + 1, y + 1)) {
        path.push({ x: x + 1, y: y + 1 });
      } else {
        this.set(x, y, Material.Sand);
        return path;
      }
    }

    return undefined;
  }

  simulate() {
    let count = 0;

    let path = [{ x: 500, y: 0 }];

    while (true) {
      path = this.drop(path);

      if (!path) {
        return count;
      }

      count += 1;
    }
  }

  draw() {
    let out = "";

    for (let y = this.minY; y <= this.maxY + 5; y++) {
      for (let x = this.minX - 5; x <= this.maxX + 5; x++) {
        out +=
          {
            [Material.Rock]: "#",
            [Material.Sand]: "o",
          }[this.get(x, y)] ?? ".";
      }
      out += "\n";
    }

    console.log(out);
  }
}

export default Grid;

export const part1 = (input: Input) => {
  const grid = new Grid(input);
  return grid.simulate();
};

export const part2 = (input: Input) => {
  const grid = new Grid(input);

  for (let x = grid.minX - grid.maxY; x <= grid.maxX + grid.maxY; x++) {
    grid.set(x, grid.maxY + 2, Material.Rock);
  }

  return grid.simulate();
};
