import { constrainedMemory } from "process";
import { Input } from "../input";
import { Coord } from "../utils";

const directions = [
  [0, 1, "v"],
  [0, -1, "^"],
  [-1, 0, "<"],
  [1, 0, ">"],
] as const;

type Nodes = Record<
  string,
  {
    node: string;
    cost: number;
  }[]
>;

const buildGraph = (input: Input) => {
  const grid = input.asCharGrid();

  const start = { x: grid[0].indexOf("."), y: 0 };
  const end = { x: grid.at(-1)!.indexOf("."), y: grid.length - 1 };

  const toCheck: Coord[] = [start];
  const checked = new Set<string>();

  const nodes: Nodes = {};

  while (toCheck.length) {
    const node = toCheck.pop()!;

    if (checked.has(`${node.x},${node.y}`)) continue;

    checked.add(`${node.x},${node.y}`);

    const ns = directions
      .map(([dx, dy, dir]) => ({
        x: node.x + dx,
        y: node.y + dy,
        dir,
      }))
      .filter((c) => {
        const x = grid[c.y]?.[c.x];
        return x && x !== "#" && (x === "." || x === c.dir);
      })
      .filter((c) => !checked.has(`${c.x},${c.y}`));

    ns.forEach((n) => {
      let curr = n;
      let i = 1;

      const inChecked = new Set<string>();
      inChecked.add(`${node.x},${node.y}`);

      while (true) {
        inChecked.add(`${curr.x},${curr.y}`);

        const nexts = directions
          .map(([dx, dy, dir]) => ({
            x: curr.x + dx,
            y: curr.y + dy,
            dir,
          }))
          .filter((c) => {
            const x = grid[c.y]?.[c.x];
            return x && x !== "#";
          })
          .filter((c) => !inChecked.has(`${c.x},${c.y}`));

        if (nexts.length === 0) {
          nodes[`${node.x},${node.y}`] = [
            ...(nodes[`${node.x},${node.y}`] ?? []),
            { node: `${curr.x},${curr.y}`, cost: i },
          ];
          break;
        } else if (nexts.length === 1) {
          curr = nexts[0];
          i += 1;
        } else {
          nodes[`${node.x},${node.y}`] = [
            ...(nodes[`${node.x},${node.y}`] ?? []),
            { node: `${curr.x},${curr.y}`, cost: i },
          ];
          toCheck.push(curr);
          break;
        }
      }
    });
  }

  return { nodes, start: `${start.x},${start.y}`, end: `${end.x},${end.y}` };
};

const solve = (nodes: Nodes, node: string, end: string): number => {
  let maxVal = 0;
  let misses = 0;

  const inner = (
    nodes: Nodes,
    node: string,
    end: string,
    checked: string[],
    dist: number
  ): void => {
    if (misses > 200) return;

    if (node === end) {
      if (dist > maxVal) {
        maxVal = dist;
        misses = 0;
      } else {
        misses += 1;
      }
      return;
    }
    if (checked.includes(node)) return;

    const path = [...checked, node];

    const toEnd = nodes[node].find((n) => n.node === end);
    if (toEnd) {
      return inner(nodes, end, end, path, dist + toEnd.cost);
    }

    nodes[node].forEach((n) => inner(nodes, n.node, end, path, dist + n.cost));
  };

  inner(nodes, node, end, [], 0);

  return maxVal;
};

export const part1 = (input: Input) => {
  const { nodes, start, end } = buildGraph(input);
  return solve(nodes, start, end);
};

const makeBi = (nodes: Nodes) => {
  Object.keys(nodes).forEach((i) => {
    nodes[i].forEach(({ node: j, cost }) => {
      if (j in nodes) {
        if (!nodes[j].some((n) => n.node === i)) {
          nodes[j].push({ node: i, cost });
        }
      } else {
        nodes[j] = [{ node: i, cost }];
      }
    });
  });

  return nodes;
};

const sortGraph = (nodes: Nodes) => {
  Object.keys(nodes).forEach((k) => {
    nodes[k].sort((a, b) => b.cost - a.cost);
  });

  return nodes;
};

export const part2 = (input: Input) => {
  const { nodes, start, end } = buildGraph(input);
  const biNodes = makeBi(nodes);
  sortGraph(biNodes);

  return solve(biNodes, start, end);
};
