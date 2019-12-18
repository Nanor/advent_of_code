import { Input } from "./input";
const aStar = require("a-star");

type Point = { x: number; y: number };

const path = (grid: string[][], pos: Point, target: Point) => {
  const res = aStar({
    start: pos,
    isEnd: ({ x, y }) => x === target.x && y === target.y,
    neighbor: ({ x, y }) => {
      const dirs = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 }
      ];

      return dirs.filter(({ x, y }) => {
        if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length)
          return false;

        const tile = grid[y][x];
        if (tile === "#") return false;

        return true;
      });
    },
    distance: () => 1,
    heuristic: ({ x, y }) => Math.abs(x - target.x) + Math.abs(y - target.y),
    hash: ({ x, y }) => `${x},${y}`
  });

  return res;
};

const solve1 = (
  grid: string[][],
  pos: Point,
  keys: { [x: string]: Point },
  locks: { [x: string]: Point }
) => {
  const blocks = Object.entries(keys)
    .map(([k, v]) => {
      const res = path(grid, pos, v);
      return {
        [k]: Object.entries(locks)
          .filter(([k2, v2]) => {
            return res.path.some((p: Point) => p.x === v2.x && p.y === v2.y);
          })
          .map(([k]) => k)
      };
    })
    .reduce((acc, x) => ({ ...acc, ...x }), {});

  const dists = {};
  Object.entries(keys).forEach(([k, v]) => {
    const dist = path(grid, pos, v).cost;
    dists[`*${k}`] = dist;
  });

  Object.entries(keys).forEach(([k1, v1]) => {
    Object.entries(keys).forEach(([k2, v2]) => {
      if (k1 !== k2) {
        const dist = path(grid, v1, v2).cost;
        dists[`${k1}${k2}`] = dist;
        dists[`${k2}${k1}`] = dist;
      }
    });
  });

  const hashDists = {};

  const inner = collected => {
    if (collected.length === Object.keys(keys).length + 1) return 0;

    const last = collected[collected.length - 1];
    const hashKey = `${collected.sort().join()}${last}`;

    if (hashKey in hashDists) {
      return hashDists[hashKey];
    }

    const dist = Object.keys(keys)
      .filter(k => !collected.includes(k))
      .filter(k => !blocks[k] || blocks[k].every(k2 => collected.includes(k2)))
      .map(k => {
        return dists[`${last}${k}`] + inner([...collected, k]);
      })
      .reduce((a, x) => (a < x ? a : x), Infinity);

    hashDists[hashKey] = dist;
    return dist;
  };

  return inner(["*"]);
};

export const part1 = (input: Input) => {
  const grid = input.asGrid();

  let pos: Point;
  const keyPos: { [x: string]: Point } = {};
  const lockPos: { [x: string]: Point } = {};

  grid.forEach((line, y) =>
    line.forEach((c, x) => {
      if (c === "@") pos = { x, y };
      if (c.match(/[a-z]/)) {
        keyPos[c] = { x, y };
      }
      if (c.match(/[A-Z]/)) {
        lockPos[c.toLowerCase()] = { x, y };
      }
    })
  );

  return solve1(grid, pos, keyPos, lockPos);
};

const solve2 = (
  grid: string[][],
  pos: Point,
  keys: { [x: string]: Point },
  locks: { [x: string]: Point }
) => {
  const blocks = Object.entries(keys)
    .map(([k, v]) => {
      const res = path(grid, pos, v);
      return {
        [k]: Object.entries(locks)
          .filter(([k2, v2]) => {
            return res.path.some((p: Point) => p.x === v2.x && p.y === v2.y);
          })
          .map(([k]) => k)
      };
    })
    .reduce((acc, x) => ({ ...acc, ...x }), {});

  grid[pos.y][pos.x] = "#";

  grid[pos.y + 1][pos.x] = "#";
  grid[pos.y - 1][pos.x] = "#";
  grid[pos.y][pos.x + 1] = "#";
  grid[pos.y][pos.x - 1] = "#";

  grid[pos.y - 1][pos.x - 1] = "@";
  grid[pos.y - 1][pos.x + 1] = "@";
  grid[pos.y + 1][pos.x - 1] = "@";
  grid[pos.y + 1][pos.x + 1] = "@";

  const starts = [
    { x: pos.x - 1, y: pos.y - 1 },
    { x: pos.x - 1, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y + 1 }
  ];

  const dists = {};
  Object.entries(keys).forEach(([k, v]) => {
    starts.forEach((s, i) => {
      const res = path(grid, s, v);
      const dist = res.status === "success" ? res.cost : Infinity;
      dists[`${i}${k}`] = dist;
    });
  });

  Object.entries(keys).forEach(([k1, v1]) => {
    Object.entries(keys).forEach(([k2, v2]) => {
      if (k1 !== k2) {
        const res = path(grid, v1, v2);
        const dist = res.status === "success" ? res.cost : Infinity;
        dists[`${k1}${k2}`] = dist;
        dists[`${k2}${k1}`] = dist;
      }
    });
  });

  const hashDists = {};

  const inner = (collected: string[], robots: string[]) => {
    if (collected.length === Object.keys(keys).length) return 0;

    const hashKey = `${collected.sort().join()}/${robots.join()}`;

    if (hashKey in hashDists) {
      return hashDists[hashKey];
    }

    const dist = Object.keys(keys)
      .filter(k => !collected.includes(k))
      .filter(k => !blocks[k] || blocks[k].every(k2 => collected.includes(k2)))
      .map(k => {
        const robotToMove = robots.findIndex(r => dists[`${r}${k}`] < Infinity);
        const rs = [...robots];
        const oldPos = rs[robotToMove];
        rs[robotToMove] = k;

        return dists[`${oldPos}${k}`] + inner([...collected, k], rs);
      })
      .reduce((a, x) => (a < x ? a : x), Infinity);

    hashDists[hashKey] = dist;
    return dist;
  };
  const res = inner([], ["0", "1", "2", "3"]);

  return res;
};

export const part2 = (input: Input) => {
  const grid = input.asGrid();

  let pos: Point;
  const keyPos: { [x: string]: Point } = {};
  const lockPos: { [x: string]: Point } = {};

  grid.forEach((line, y) =>
    line.forEach((c, x) => {
      if (c === "@") pos = { x, y };
      if (c.match(/[a-z]/)) {
        keyPos[c] = { x, y };
      }
      if (c.match(/[A-Z]/)) {
        lockPos[c.toLowerCase()] = { x, y };
      }
    })
  );

  return solve2(grid, pos, keyPos, lockPos);
};
