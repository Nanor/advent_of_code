import { validateHeaderValue } from "http";
import { Input } from "../input";

const parse = (input: Input) =>
  input
    .asLines()
    .filter(Boolean)
    .map((l) => {
      const m = l.match(
        /^Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)$/
      );

      return {
        id: m[1],
        flow: parseInt(m[2], 10),
        connects: m[3].split(", "),
      };
    });

type Valve = ReturnType<typeof parse>[number];

const makeConnections = (valves: Valve[]) => {
  const connects: { [from: string]: { [to: string]: number } } = {};

  for (const valve of valves) {
    connects[valve.id] = { [valve.id]: 1 };

    const toCheck = [valve.id];

    while (toCheck.length > 0) {
      const next = toCheck.shift();

      for (const cons of valves.find((v) => v.id === next).connects) {
        if (
          !connects[valve.id][cons] ||
          connects[valve.id][next] + 1 < connects[valve.id][cons]
        ) {
          connects[valve.id][cons] = connects[valve.id][next] + 1;
          toCheck.push(cons);
        }
      }
    }
  }

  return connects;
};

type Connections = ReturnType<typeof makeConnections>;

const solve = (
  valves: Valve[],
  connections: Connections,
  loc: string,
  time: number,
  open: string[],
  score: number,
  output: { [opens: string]: number }
) => {
  open.sort();
  const key = open.join(",");

  if (!output[key] || output[key] < score) {
    output[key] = score;
  }

  if (time <= 0) return;

  for (const nextValve of valves) {
    if (open.find((v) => v === nextValve.id)) continue;

    const cost = connections[loc][nextValve.id];

    if (cost > time) continue;

    solve(
      valves,
      connections,
      nextValve.id,
      time - cost,
      [...open, nextValve.id],
      score + (time - cost) * nextValve.flow,
      output
    );
  }
};

export const part1 = (input: Input) => {
  const valves = parse(input);
  const connections = makeConnections(valves);

  const output: { [opens: string]: number } = {};

  solve(
    valves.filter((v) => v.flow > 0),
    connections,
    "AA",
    30,
    [],
    0,
    output
  );

  return Math.max(...Object.values(output));
};

export const part2 = (input: Input) => {
  const valves = parse(input);
  const connections = makeConnections(valves);

  const output: { [opens: string]: number } = {};

  solve(
    valves.filter((v) => v.flow > 0),
    connections,
    "AA",
    26,
    [],
    0,
    output
  );

  const options = Object.entries(output).map(([ops, value]) => ({
    set: new Set(ops.split(",")),
    value,
  }));

  let max = 0;

  options.forEach(({ set: op1, value: v1 }) => {
    options.forEach(({ set: op2, value: v2 }) => {
      const joined = new Set([...op1, ...op2]);

      if (op1.size + op2.size === joined.size) {
        max = Math.max(max, v1 + v2);
      }
    });
  });

  return max;
};
