const items = ["ore", "clay", "obsidian", "geode"] as const;

type Item = typeof items[number];

const parse = (input: Input) =>
  input
    .asMatchGroups(
      /Blueprint (?<id>\d+): Each ore robot costs (?<oreOreCost>\d+) ore. Each clay robot costs (?<clayOreCost>\d+) ore. Each obsidian robot costs (?<obsOreCost>\d+) ore and (?<obsClayCost>\d+) clay. Each geode robot costs (?<geodeOreCost>\d+) ore and (?<geodeObsCost>\d+) obsidian./g
    )
    .map((m) => ({
      id: parseInt(m.id),
      costs: {
        ore: { ore: parseInt(m.oreOreCost) },
        clay: { ore: parseInt(m.clayOreCost) },
        obsidian: {
          ore: parseInt(m.obsOreCost),
          clay: parseInt(m.obsClayCost),
        },
        geode: {
          ore: parseInt(m.geodeOreCost),
          obsidian: parseInt(m.geodeObsCost),
        },
      },
    }));

type Blueprint = ReturnType<typeof parse>[number];

const simulate = (blueprint: Blueprint, time: number, homestretch = 0) => {
  const startingInventory = {
    robots: {
      ore: 1,
      clay: 0,
      obsidian: 0,
      geode: 0,
    },
    minerals: {
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0,
    },
  };

  const maxRobots = Object.fromEntries(
    items.map((i) => [
      i,
      Math.max(...items.map((j) => blueprint.costs[j][i] ?? 0)),
    ])
  ) as Record<Item, number>;
  maxRobots.geode = Infinity;

  const inner = (inventory: typeof startingInventory, time: number) => {
    if (time <= 0) {
      return inventory.minerals.geode;
    }

    const values = [];

    items
      .filter(
        (i) =>
          inventory.robots[i] * time + inventory.minerals[i] <
            maxRobots[i] * time &&
          (!(i === "clay" || i === "ore") || time > homestretch)
      )
      .forEach((nextToBuy) => {
        let t = time;

        const minerals = { ...inventory.minerals };
        const robots = { ...inventory.robots };

        const cost = blueprint.costs[nextToBuy];

        while (t > 0) {
          const canAfford = Object.entries(cost).every(
            ([k, v]) => minerals[k] >= v
          );

          items.forEach((i) => (minerals[i] += robots[i]));
          if (canAfford) {
            robots[nextToBuy] += 1;
            Object.entries(cost).forEach(([k, v]) => (minerals[k] -= v));

            values.push(inner({ robots, minerals }, t - 1));
            return;
          }

          t -= 1;
        }

        values.push(inventory.minerals.geode);
      });

    return Math.max(...values);
  };

  return inner(startingInventory, time);
};

export const part1 = (input: Input) => {
  const blueprints = parse(input);

  const qualities = blueprints.map((blueprint) => ({
    id: blueprint.id,
    quality: simulate(blueprint, 24),
  }));

  return qualities.reduce((acc, q) => acc + q.id * q.quality, 0);
};

export const part2 = (input: Input) => {
  const blueprints = parse(input);

  return blueprints
    .slice(0, 3)
    .reduce((acc, blueprint) => acc * simulate(blueprint, 32, 13), 1);
};
