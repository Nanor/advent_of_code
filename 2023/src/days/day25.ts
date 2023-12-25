import { Heap } from "@datastructures-js/heap";
import { Input } from "../input";

const getCosts = (
  wires: Record<string, string[]>,
  start: string,
  end?: string
): Record<string, number> => {
  const cost: Record<string, number> = Object.fromEntries(
    Object.keys(wires).map((w) => [w, Infinity])
  );
  cost[start] = 0;

  const toCheck = new Heap<string>((a, b) => cost[a] - cost[b]);
  toCheck.push(start);
  while (!toCheck.isEmpty()) {
    const curr = toCheck.pop()!;
    if (curr === end) break;

    wires[curr].forEach((w) => {
      if (cost[curr] + 1 < cost[w]) {
        cost[w] = cost[curr] + 1;
        toCheck.push(w);
      }
    });
  }

  return cost;
};

const getPath = (
  wires: Record<string, string[]>,
  start: string,
  end: string
): string[] => {
  const costs = getCosts(wires, start, end);

  const path = [end];
  let curr = end;
  while (curr !== start) {
    curr = wires[curr].find((w) => costs[w] + 1 === costs[curr])!;
    path.push(curr);
  }

  return path;
};

export const part1 = (input: Input) => {
  const wires: Record<string, string[]> = {};

  input.asLines().forEach((line) => {
    const [left, right] = line.split(": ");
    const ws = right.split(" ");

    wires[left] = [...(wires[left] ?? []), ...ws];
    ws.forEach((w) => {
      wires[w] = [...(wires[w] ?? []), left];
    });
  });

  const nodes = Object.keys(wires);

  const counts = Object.fromEntries(nodes.map((n) => [n, 0]));

  for (let i = 0; i < 300; i++) {
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    const b = nodes[Math.floor(Math.random() * nodes.length)];
    if (a === b) continue;

    const path = getPath(wires, a, b);
    path.forEach((n) => (counts[n] += 1));
  }

  const cEntries = Object.entries(counts);
  cEntries.sort((a, b) => b[1] - a[1]);
  const candidateNodes = cEntries.map((x) => x[0]);

  const candidates: [string, string][] = [];
  for (const n of candidateNodes) {
    if (candidates.length >= 3) break;
    if (candidates.some(([x, y]) => x === n || y === n)) continue;

    const m = candidateNodes.find((m) => wires[n].includes(m));
    if (m) {
      candidates.push([n, m]);
    }
  }

  candidates.forEach(([n, m]) => {
    wires[n] = wires[n].filter((a) => a !== m);
    wires[m] = wires[m].filter((a) => a !== n);
  });

  const node = nodes[Math.floor(Math.random() * nodes.length)];

  const costs = getCosts(wires, node);

  const inSet = Object.values(costs).filter((c) => isFinite(c)).length;

  return inSet * (nodes.length - inSet);
};
