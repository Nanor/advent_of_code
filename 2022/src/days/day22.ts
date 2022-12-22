import Grid from "../common/Grid";

class WrappingGrid extends Grid<boolean> {
  height: number;
  pos: Vec2;
  facing: number;
  path: number[];

  constructor(lines: string[]) {
    super(Math.max(...lines.map((l) => l.length)));
    this.height = lines.length;
    this.facing = 0;
    this.path = [];

    lines.forEach((l, y) =>
      l.split("").forEach((c, x) => {
        if (c !== " ") {
          if (!this.pos) {
            this.pos = { x, y };
            this.path[x * 1000 + y] = 0;
          }

          this.set({ x, y }, c === "#");
        }
      })
    );
  }

  protected hash({ x, y }: Vec2): number {
    return (x + 1000) * 10000 + (y + 1000);
  }

  draw() {
    let out = "";

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.path[x * 1000 + y] !== undefined) {
          out += ">V<^"[this.path[x * 1000 + y]];
        } else if (this.has({ x, y })) {
          out += this.get({ x, y }) ? "#" : ".";
        } else {
          out += " ";
        }
      }
      out += "\n";
    }
    out += "\n";

    console.log(out);
  }

  turn(dir: "L" | "R") {
    this.facing = (this.facing + (dir === "L" ? -1 : 1) + 4) % 4;
    this.path[this.pos.x * 1000 + this.pos.y] = this.facing;
  }

  move(count: number) {
    let { x, y } = this.pos;

    const fn = [
      () => {
        if (this.has({ x: x + 1, y })) {
          x += 1;
        } else {
          x = [...Array(this.width)]
            .map((_, i) => i)
            .find((x) => this.has({ x, y }));
        }
      },
      () => {
        if (this.has({ x, y: y + 1 })) {
          y += 1;
        } else {
          y = [...Array(this.height)]
            .map((_, i) => i)
            .find((y) => this.has({ x, y }));
        }
      },
      () => {
        if (this.has({ x: x - 1, y })) {
          x -= 1;
        } else {
          x = [...Array(this.width)]
            .map((_, i) => this.width - i - 1)
            .find((x) => this.has({ x, y }));
        }
      },
      () => {
        if (this.has({ x, y: y - 1 })) {
          y -= 1;
        } else {
          y = [...Array(this.height)]
            .map((_, i) => this.height - i - 1)
            .find((y) => this.has({ x, y }));
        }
      },
    ][this.facing];

    for (let i = 0; i < count; i++) {
      fn();
      if (this.get({ x, y })) {
        break;
      }
      this.pos = { x, y };
      this.path[x * 1000 + y] = this.facing;
    }
  }
}

export const part1 = (input: Input) => {
  const [gridStr, insts] = input.asParagraphs();

  const instructions = Array.from(insts[0].matchAll(/([LR])|(\d+)/g)).map(
    (m) => (m[1] as "L" | "R") ?? parseInt(m[2])
  );

  const grid = new WrappingGrid(gridStr);

  instructions.forEach((inst) => {
    if (typeof inst === "number") {
      grid.move(inst);
    } else {
      grid.turn(inst);
    }
  });

  return (grid.pos.y + 1) * 1000 + (grid.pos.x + 1) * 4 + grid.facing;
};

class Cube extends WrappingGrid {
  faceWidth: number;

  constructor(lines: string[]) {
    super(lines);

    this.faceWidth = Math.sqrt(this.values().length / 6);
  }

  move(count: number) {
    let { x, y } = this.pos;
    let facing = this.facing;
    const fw = this.faceWidth;

    const ifHasSet = (nx: number, ny: number, nFacing: number) => {
      if (this.has({ x: nx, y: ny })) {
        if (~(x / fw) === ~(nx / fw) && ~(y / fw) === ~(ny / fw)) {
          console.log({ x, y }, { nx, ny });
          throw Error("Moved to same face");
        }

        x = nx;
        y = ny;
        facing = (nFacing + 4) % 4;
        return true;
      }
      return false;
    };

    const joinError = () => {
      throw new Error("No join found");
    };

    for (let i = 0; i < count; i++) {
      switch (facing) {
        case 0:
          if (this.has({ x: x + 1, y })) {
            x += 1;
          } else {
            const offset = y % fw;

            ifHasSet(x + offset + 1, y - offset - 1, facing - 1) ||
              ifHasSet(x - fw, y + fw * 3 - offset * 2 - 1, facing + 2) ||
              ifHasSet(x + fw, y - offset * 2 - 1 - fw, facing + 2) ||
              joinError();
          }
          break;
        case 1:
          if (this.has({ x, y: y + 1 })) {
            y += 1;
          } else {
            const offset = x % fw;

            ifHasSet(x - offset - 1, y + offset + 1, facing + 1) ||
              ifHasSet(x + fw * 2, y - fw * 4 + 1, facing) ||
              joinError();
          }
          break;
        case 2:
          if (this.has({ x: x - 1, y })) {
            x -= 1;
          } else {
            const offset = y % fw;

            ifHasSet(x + fw + offset, y - fw * 3 - offset, facing - 1) ||
              ifHasSet(x - fw + offset, y - offset + fw, facing - 1) ||
              ifHasSet(x + fw, y - fw - offset * 2 - 1, facing + 2) ||
              ifHasSet(x - fw, y - offset * 2 + fw * 3 - 1, facing + 2) ||
              joinError();
          }
          break;
        case 3:
          if (this.has({ x, y: y - 1 })) {
            y -= 1;
          } else {
            const offset = x % fw;

            ifHasSet(x + fw - offset, y - (fw - offset), facing + 1) ||
              ifHasSet(x - fw * 2, y + fw * 4 - 1, facing) ||
              ifHasSet(x - fw * 1 - offset, y + fw * 3 + offset, facing + 1) ||
              joinError();
          }
          break;
      }

      if (this.get({ x, y })) {
        break;
      }

      this.pos = { x, y };
      this.facing = facing;

      this.path[x * 1000 + y] = facing;
    }
  }
}

const testCube = () => {
  const str = `     ..........
     ..........
     ..........
     ..........
     ..........
     .....
     .....
     .....
     .....
     .....
..........
..........
..........
..........
..........
.....
.....
.....
.....
.....
`;

  const grid = new Cube(str.split("\n"));

  for (let y = 0; y < 20; y++) {
    const pos = grid.has({ x: 2, y }) ? { x: 2, y } : { x: 7, y };
    grid.path = [];
    grid.pos = pos;
    grid.facing = 0;

    try {
      grid.move(grid.faceWidth * 4);
    } catch (e) {
      grid.draw();
      throw e;
    }

    grid.draw();

    if (grid.pos.x !== pos.x || grid.pos.y !== pos.y || grid.facing !== 0) {
      throw Error("Incomplete loop");
    }
  }
  for (let y = 0; y < 20; y++) {
    const pos = grid.has({ x: 2, y }) ? { x: 2, y } : { x: 7, y };
    grid.path = [];
    grid.pos = pos;
    grid.facing = 2;

    try {
      grid.move(grid.faceWidth * 4);
    } catch (e) {
      grid.draw();
      throw e;
    }

    grid.draw();

    if (grid.pos.x !== pos.x || grid.pos.y !== pos.y || grid.facing !== 2) {
      throw Error("Incomplete loop");
    }
  }
  for (let x = 0; x < 15; x++) {
    const pos = grid.has({ x, y: 2 }) ? { x, y: 2 } : { x, y: 12 };
    grid.path = [];
    grid.pos = pos;
    grid.facing = 1;

    try {
      grid.move(grid.faceWidth * 4);
    } catch (e) {
      grid.draw();
      throw e;
    }

    grid.draw();

    if (grid.pos.x !== pos.x || grid.pos.y !== pos.y || grid.facing !== 1) {
      throw Error("Incomplete loop");
    }
  }
  for (let x = 0; x < 15; x++) {
    const pos = grid.has({ x, y: 2 }) ? { x, y: 2 } : { x, y: 12 };
    grid.path = [];
    grid.pos = pos;
    grid.facing = 3;

    try {
      grid.move(grid.faceWidth * 4);
    } catch (e) {
      grid.draw();
      throw e;
    }

    grid.draw();

    if (grid.pos.x !== pos.x || grid.pos.y !== pos.y || grid.facing !== 3) {
      throw Error("Incomplete loop");
    }
  }
};

export const part2 = (input: Input) => {
  const [gridStr, insts] = input.asParagraphs();

  const instructions = Array.from(insts[0].matchAll(/([LR])|(\d+)/g)).map(
    (m) => (m[1] as "L" | "R") ?? parseInt(m[2])
  );

  const grid = new Cube(gridStr);

  instructions.forEach((inst, i) => {
    if (typeof inst === "number") {
      grid.move(inst);
    } else {
      grid.turn(inst);
    }
  });

  return (grid.pos.y + 1) * 1000 + (grid.pos.x + 1) * 4 + grid.facing;
};
