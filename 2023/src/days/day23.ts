import { Input } from "../input";
import { Coord } from "../utils";

const directions = [
  [0, 1, "v"],
  [0, -1, "^"],
  [-1, 0, "<"],
  [1, 0, ">"],
] as const;

const buildGraph = (input: Input) => {
  const grid = input.asCharGrid();

  const start = { x: grid[0].indexOf("."), y: 0 };
  const end = { x: grid.at(-1)!.indexOf("."), y: grid.length - 1 };

  const toCheck: Coord[] = [start];
  const checked = new Set<string>();

  const nodes: Record<string, { node: string; cost: number }[]> = {};

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

const solve = (
  { nodes, start, end }: ReturnType<typeof buildGraph>,
  checked: string[] = []
): number => {
  if (start === end) return 0;
  if (checked.includes(start)) return -Infinity;

  return Math.max(
    ...nodes[start].map(
      (n) => n.cost + solve({ nodes, start: n.node, end }, [...checked, start])
    )
  );
};

export const part1 = (input: Input) => {
  const graph = buildGraph(input);
  return solve(graph);
};

const makeBi = (nodes: Record<string, { node: string; cost: number }[]>) => {
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

export const part2 = (input: Input) => {
  const graph = buildGraph(input);

  return solve({ ...graph, nodes: makeBi(graph.nodes) });
};
