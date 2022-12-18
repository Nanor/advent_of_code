import Grid from "../common/Grid";

enum Material {
  Rock = 1,
  Sand = 2,
}

class Cavern extends Grid<Material> {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  constructor(input: Input) {
    super(10000);

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
              this.set({ x: dx, y }, Material.Rock);
            }
          }
          if (cy !== undefined && y !== cy) {
            for (let dy = cy; dy !== y; dy += Math.sign(y - cy)) {
              this.set({ x, y: dy }, Material.Rock);
            }
          }
          cx = x;
          cy = y;
          this.set({ x, y }, Material.Rock);

          this.minX = Math.min(this.minX, x);
          this.maxX = Math.max(this.maxX, x);
          this.minY = Math.min(this.minY, y);
          this.maxY = Math.max(this.maxY, y);

          return;
        });
      });
  }

  drop(path: { x: number; y: number }[]) {
    while (path.length > 0) {
      const { x, y } = path[path.length - 1];

      if (y > this.maxY + 10) return undefined;

      if (this.has({ x, y })) {
        path.pop();
        continue;
      }

      if (!this.has({ x, y: y + 1 })) {
        path.push({ x, y: y + 1 });
      } else if (!this.has({ x: x - 1, y: y + 1 })) {
        path.push({ x: x - 1, y: y + 1 });
      } else if (!this.has({ x: x + 1, y: y + 1 })) {
        path.push({ x: x + 1, y: y + 1 });
      } else {
        this.set({ x, y }, Material.Sand);
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
          }[this.get({ x, y })] ?? ".";
      }
      out += "\n";
    }

    console.log(out);
  }
}

export const part1 = (input: Input) => {
  const grid = new Cavern(input);

  return grid.simulate();
};

export const part2 = (input: Input) => {
  const grid = new Cavern(input);

  for (let x = grid.minX - grid.maxY; x <= grid.maxX + grid.maxY; x++) {
    grid.set({ x, y: grid.maxY + 2 }, Material.Rock);
  }

  return grid.simulate();
};
