import breadthFirstSearch from "../common/breadthFirstSearch";
import { Input } from "../input";

const parse = (input: Input) => {
  return input
    .asMatchGroups(
      /Valve (?<id>\w+) has flow rate=(?<flow>\d+); tunnels? leads? to valves? (?<cons>[A-Z, ]+)/g
    )
    .map((m) => {
      return {
        id: m.id,
        flow: parseInt(m.flow, 10),
        connects: m.cons.split(", "),
      };
    });
};

type Valve = ReturnType<typeof parse>[number];

const makeConnections = (valves: Valve[]) => {
  const connects: { [from: string]: { [to: string]: number } } = {};

  for (const valve of valves) {
    const costs = breadthFirstSearch(
      valve,
      (v) => v.id,
      (v) =>
        v.connects.map((node) => ({
          node: valves.find(({ id }) => id === node),
          cost: 1,
        }))
    );

    connects[valve.id] = {};
    costs.forEach(({ node, cost }) => {
      connects[valve.id][node.id] = cost + 1;
    });
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

const outerSolve = (input: Input, time: number) => {
  const valves = parse(input);
  const connections = makeConnections(valves);

  const output: { [opens: string]: number } = {};

  solve(
    valves.filter((v) => v.flow > 0),
    connections,
    "AA",
    time,
    [],
    0,
    output
  );

  return output;
};

export const part1 = (input: Input) => {
  const output = outerSolve(input, 30);

  return Math.max(...Object.values(output));
};

export const part2 = (input: Input) => {
  const output = outerSolve(input, 26);

  const options = Object.entries(output).map(([ops, value]) => ({
    set: new Set(ops.split(",")),
    value,
  }));

  options.sort((a, b) => b.value - a.value);

  let max = 0;

  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      const { set: op1, value: v1 } = options[i];
      const { set: op2, value: v2 } = options[j];

      const joined = new Set([...op1, ...op2]);

      if (op1.size + op2.size === joined.size) {
        max = Math.max(max, v1 + v2);
        break;
      }
    }
  }

  return max;
};
