import { Input } from "./types";
import intcode, { run } from "./Intcode";

type Point = { x: number; y: number; dir?: number };

const hash = ({ x, y }: Point): number => {
  const t = Math.abs(x) + Math.abs(y);
  const t2 = (t * (t + 2)) / 2;
  const t3 = t2 - Math.abs(y);
  return t3 * 4 + (x < 0 ? 1 : 0) + (y < 0 ? 2 : 0);
};

export const part1 = (input: Input) => {
  const prog = input.asNumberArray();
  let comp = intcode(prog);

  const panels: { [x: number]: number } = {};

  let curr: Point = { x: 0, y: 0, dir: 0 };

  while (!comp.halted) {
    comp.input = [panels[hash(curr)] || 0];
    comp.output = [];
    comp = run(comp);

    if (comp.halted) break;

    const [col, turn] = comp.output;
    panels[hash(curr)] = col;
    curr.dir = (curr.dir + (turn === 0 ? -1 : 1)) % 4;
    if (curr.dir < 0) curr.dir += 4;

    switch (curr.dir) {
      case 0:
        curr.y -= 1;
        break;
      case 1:
        curr.x += 1;
        break;
      case 2:
        curr.y += 1;
        break;
      case 3:
        curr.x -= 1;
        break;
    }
  }

  return Object.keys(panels).length;
};

export const part2 = (input: Input) => {
  const prog = input.asNumberArray();
  let comp = intcode(prog);

  const panels: { [x: number]: number } = { 0: 1 };

  let curr: Point = { x: 0, y: 0, dir: 0 };

  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  while (!comp.halted) {
    comp.input = [panels[hash(curr)] || 0];
    comp.output = [];
    comp = run(comp);

    if (comp.halted) break;

    const [col, turn] = comp.output;
    panels[hash(curr)] = col;
    curr.dir = (curr.dir + (turn === 0 ? -1 : 1)) % 4;
    if (curr.dir < 0) curr.dir += 4;

    switch (curr.dir) {
      case 0:
        curr.y -= 1;
        break;
      case 1:
        curr.x += 1;
        break;
      case 2:
        curr.y += 1;
        break;
      case 3:
        curr.x -= 1;
        break;
    }

    minX = Math.min(minX, curr.x);
    minY = Math.min(minY, curr.y);
    maxX = Math.max(maxX, curr.x);
    maxY = Math.max(maxY, curr.y);
  }

  let out = "";

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      out += panels[hash({ x, y })] ? "#" : " ";
    }
    out += "\n";
  }

  return out;
};
