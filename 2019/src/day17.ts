import { Input, asInput } from "./input";
import intcode, { withInput } from "./Intcode";

export const part1 = (input: Input) => {
  const data = input.asNumberArray();
  const comp = intcode(data);

  let out = "";
  comp.output.forEach(c => {
    out += String.fromCharCode(c);
  });

  const grid = asInput(out.trim()).asGrid();

  let total = 0;
  grid.forEach((line, y) => {
    line.forEach((c, x) => {
      if (
        c === "#" &&
        y > 1 &&
        y < grid.length - 1 &&
        x > 1 &&
        x < line.length - 1 &&
        grid[y - 1][x] === "#" &&
        grid[y + 1][x] === "#" &&
        grid[y][x - 1] === "#" &&
        grid[y][x + 1] === "#"
      ) {
        total += x * y;
      }
    });
  });

  return total;
};

const getMove = ({ x, y, dir }) =>
  ({
    "^": { x, y: y - 1, dir },
    v: { x, y: y + 1, dir },
    "<": { x: x - 1, y, dir },
    ">": { x: x + 1, y, dir }
  }[dir]);

const turnLeft = (dir: string) =>
  ({
    "^": "<",
    "<": "v",
    v: ">",
    ">": "^"
  }[dir]);

const turnRight = (dir: string) =>
  ({
    "^": ">",
    ">": "v",
    v: "<",
    "<": "^"
  }[dir]);

const getAt = (grid: string[][], { x, y }: { x: number; y: number }) => {
  if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
    return grid[y][x];
  } else {
    return ".";
  }
};

export const getPath = (grid: string[][]) => {
  let pos: { x: number; y: number; dir: string };
  grid.forEach((line, y) => {
    line.forEach((c, x) => {
      if (["^", "v", "<", ">"].includes(c)) {
        pos = { x, y, dir: c };
      }
    });
  });

  const path = [];

  while (true) {
    const movePos = getMove(pos);
    if (getAt(grid, movePos) === "#") {
      path.push("1");
      pos = movePos;
      continue;
    }
    const leftPos = getMove({ ...pos, dir: turnLeft(pos.dir) });
    if (getAt(grid, leftPos) === "#") {
      path.push("L", "1");
      pos = leftPos;
      continue;
    }
    const rightPos = getMove({ ...pos, dir: turnRight(pos.dir) });
    if (getAt(grid, rightPos) === "#") {
      path.push("R", "1");
      pos = rightPos;
      continue;
    }
    break;
  }

  return simplify(path);
};

const simplify = path =>
  path.reduce((acc, x) => {
    const last = parseInt(acc[acc.length - 1], 10);
    if (last && x === "1") {
      acc[acc.length - 1] = `${last + 1}`;
    } else {
      acc.push(x);
    }
    return acc;
  }, []);

export const makeMain = (
  path: string[],
  funcs: {
    A?: string[];
    B?: string[];
    C?: string[];
  }
) => {
  if (path.length === 0) {
    return [];
  }

  for (let i = 0; i < Object.keys(funcs).length; i++) {
    const funcKey = Object.keys(funcs)[i];
    const func = funcs[funcKey];

    let matches = true;
    for (let j = 0; j < func.length; j++) {
      if (path[j] !== func[j]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      const rest = makeMain(path.slice(func.length), funcs);
      if (rest) {
        return [funcKey, ...rest];
      }
    }
  }
};

export const breakPath = (path: string[]) => {
  const aStart = 0;
  for (let aEnd = 1; aEnd < path.length + 1; aEnd++) {
    const A = path.slice(aStart, aEnd);
    if (A.length === 0 || A.length > 10) continue;

    for (let bStart = aEnd; bStart < path.length; bStart++) {
      const soFar1 = makeMain(path.slice(0, bStart), { A });
      if (soFar1 && soFar1.length < 10) {
        for (let bEnd = bStart + 1; bEnd < path.length + 1; bEnd++) {
          const B = path.slice(bStart, bEnd);
          if (B.length === 0 || B.length > 10) continue;

          for (let cStart = bEnd; cStart < path.length; cStart++) {
            const soFar2 = makeMain(path.slice(0, cStart), { A, B });
            if (soFar2 && soFar2.length < 10) {
              for (let cEnd = cStart + 1; cEnd < path.length + 1; cEnd++) {
                const C = path.slice(cStart, cEnd);
                if (C.length === 0 || C.length > 10) continue;

                const main = makeMain(path, { A, B, C });
                if (main && main.length <= 10) {
                  return { main, A, B, C };
                }
              }
            }
          }
        }
      }
    }
  }
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();
  data[0] = 2;
  let comp = intcode(data);

  let out = "";
  comp.output.forEach(c => {
    out += String.fromCharCode(c);
  });

  // console.log(out);

  const grid = asInput(out.trim()).asGrid();

  const path = getPath(grid);
  const funcs = breakPath(path);

  const inst = [funcs.main, funcs.A, funcs.B, funcs.C, "n", ""]
    .join("\n")
    .split("")
    .map(c => c.charCodeAt(0));

  comp = withInput(comp, inst);

  return comp.output[comp.output.length - 1];
};
