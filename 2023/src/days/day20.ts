import { Queue } from "@datastructures-js/queue";
import type { Input } from "../input";
import { gcd, lcm } from "../utils";

type BaseModule = {
  type: string;
  name: string;
  targets: string[];
};

type FlipFlop = BaseModule & {
  type: "%";
  state: boolean;
};

type Conjunction = BaseModule & {
  type: "&";
  state: Record<string, boolean>;
};

type Broadcaster = BaseModule & {
  type: "b";
};

type Module = FlipFlop | Conjunction | Broadcaster;

type Pulse = {
  source: string;
  target: string;
  type: boolean;
};

const parse = (input: Input): Record<string, Module> => {
  const modules: Record<string, Module> = input
    .asLines()
    .map((l) => {
      const [_, type, name, targets] = l.match(
        /^([&%]?)(\S+) -> (\w+(?:, \w+)*)$/
      )!;

      const base = {
        name,
        targets: targets.split(", "),
        pulses: [],
      };

      switch (type) {
        case "":
          return {
            ...base,
            type: "b",
          };
        case "%":
          return {
            ...base,
            type,
            state: false,
          };
        case "&":
          return {
            ...base,
            type,
            state: {},
          };
        default:
          throw new Error("Unknown module");
      }
    })
    .reduce((acc, m) => ({ ...acc, [m.name]: m }), {});

  Object.values(modules).forEach((m) => {
    m.targets.forEach((t) => {
      const m2 = modules[t];
      if (m2?.type === "&") {
        m2.state[m.name] = false;
      }
    });
  });

  return modules;
};

const handlePulse = (pulses: Queue<Pulse>, modules: Record<string, Module>) => {
  const pulse = pulses.dequeue()!;

  const module = modules[pulse.target];
  if (!module) return;

  if (module.type === "b") {
    module.targets.forEach((target) => {
      pulses.enqueue({
        source: module.name,
        type: pulse.type,
        target,
      });
    });
  }
  if (module.type === "%" && !pulse.type) {
    module.state = !module.state;
    module.targets.forEach((target) => {
      pulses.enqueue({
        source: module.name,
        type: module.state,
        target,
      });
    });
  }
  if (module.type === "&") {
    module.state[pulse.source] = pulse.type;
    const newType = !Object.values(module.state).every(Boolean);
    module.targets.forEach((target) => {
      pulses.enqueue({
        source: module.name,
        type: newType,
        target,
      });
    });
  }
};

export const part1 = (input: Input) => {
  const modules = parse(input);

  let high = 0;
  let low = 0;

  for (let i = 0; i < 1000; i++) {
    const pulses = new Queue<Pulse>([
      {
        source: "button",
        type: false,
        target: "broadcaster",
      },
    ]);

    while (!pulses.isEmpty()) {
      if (pulses.front()!.type) {
        high += 1;
      } else {
        low += 1;
      }

      handlePulse(pulses, modules);
    }
  }

  return low * high;
};

export const part2 = (input: Input) => {
  const modules = parse(input);
  const moduleList = Object.values(modules);

  const finalModule = moduleList.find((m) => m.targets.includes("rx"))!;
  const finalInputs = moduleList.filter((m) =>
    m.targets.includes(finalModule.name)
  );

  const counts = finalInputs.reduce<Record<string, number>>(
    (acc, m) => ({ ...acc, [m.name]: Infinity }),
    {}
  );

  let i = 0;
  while (Object.values(counts).some((c) => c === Infinity)) {
    i += 1;

    const pulses = new Queue<Pulse>([
      {
        source: "button",
        type: false,
        target: "broadcaster",
      },
    ]);

    while (!pulses.isEmpty()) {
      const p = pulses.front();

      if (p.type && counts[p.source] === Infinity) {
        counts[p.source] = i;
      }

      handlePulse(pulses, modules);
    }
  }

  return Object.values(counts).reduce(lcm);
};
