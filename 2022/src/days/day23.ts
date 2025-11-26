import HashSet from "../common/HashSet";
import { Input } from "../input";
import { Vec2 } from "../types";

class ElfGrid extends HashSet<Vec2, number> {
  order: ("N" | "S" | "W" | "E")[];

  constructor(input: Input) {
    super();

    input.asGrid().forEach((l, y) =>
      l.forEach((c, x) => {
        if (c === "#") this.add({ x, y });
      })
    );

    this.order = ["N", "S", "W", "E"];
  }

  hash({ x, y }: Vec2): number {
    return (x + 500) * 1000 + (y + 500);
  }

  get bounds() {
    const arr = Array.from(this.values());
    const xs = arr.map((v) => v.x);
    const ys = arr.map((v) => v.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return { minX, maxX, minY, maxY };
  }

  draw() {
    const { minX, maxX, minY, maxY } = this.bounds;

    let out = "";

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (this.has({ x, y })) {
          out += "#";
        } else {
          out += " ";
        }
      }
      out += "\n";
    }

    console.log(out, "");
  }

  step() {
    const elves = Array.from(this.values());
    const plans = {};
    const targets = {};

    elves.forEach((elf) => {
      const { x, y } = elf;
      let target: Vec2;

      const nears = [];

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          nears.push(this.has({ x: x + dx, y: y + dy }));
        }
      }

      if (nears.every((x) => x === false)) return;

      for (const dir of this.order) {
        if (dir === "N" && !nears[0] && !nears[1] && !nears[2]) {
          target = { x, y: y - 1 };
          break;
        }
        if (dir === "E" && !nears[2] && !nears[4] && !nears[7]) {
          target = { x: x + 1, y };
          break;
        }
        if (dir === "S" && !nears[5] && !nears[6] && !nears[7]) {
          target = { x, y: y + 1 };
          break;
        }
        if (dir === "W" && !nears[0] && !nears[3] && !nears[5]) {
          target = { x: x - 1, y };
          break;
        }
      }
      if (target) {
        plans[this.hash(elf)] = target;
        targets[this.hash(target)] = (targets[this.hash(target)] ?? 0) + 1;
      }
    });

    let moved = false;

    elves.forEach((elf) => {
      const target = plans[this.hash(elf)];
      if (target && targets[this.hash(target)] === 1) {
        this.delete(elf);
        this.add(target);
        moved = true;
      }
    });

    this.order.push(this.order.shift());

    return moved;
  }

  get empties() {
    const { minX, maxX, minY, maxY } = this.bounds;

    let out = 0;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (!this.has({ x, y })) {
          out += 1;
        }
      }
    }

    return out;
  }
}

export const part1 = (input: Input) => {
  const elves = new ElfGrid(input);

  for (let i = 0; i < 10; i++) {
    elves.step();
  }

  return elves.empties;
};

export const part2 = (input: Input) => {
  const elves = new ElfGrid(input);

  let i = 0;
  while (true) {
    i += 1;
    if (!elves.step()) {
      break;
    }
  }

  return i;
};
