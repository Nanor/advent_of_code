import { Input } from "./input";

const asRules = (input: Input) =>
  input
    .asLines()
    .map((l) => {
      const [a, b] = l.split("contain");
      const outer = a.match(/^(.+) bags/)[1];

      const bs = b.split(",");
      if (b.match(/no other bags/)) {
        return [outer, {}];
      }
      const inners = bs
        .map((b) => {
          return b.match(/(\d+) (.+) bags?/).slice(1, 3);
        })
        .reduce((acc, [v, k]) => ({ ...acc, [k]: v }), {});

      return [outer, inners];
    })
    .reduce((acc, [k, v]: [string, Object]) => ({ ...acc, [k]: v }), {});

export const part1 = (input: Input) => {
  const rules = asRules(input);

  const unchecked = Object.keys(rules);
  const counted = [];

  while (unchecked.length > 0) {
    const bag = unchecked.shift();
    let remove = false;

    const inners = Object.keys(rules[bag]);

    if (
      inners.some((i) => counted.includes(i)) ||
      inners.includes("shiny gold")
    ) {
      counted.push(bag);
      remove = true;
    }

    if (inners.every((i) => !unchecked.includes(i))) {
      remove = true;
    }

    if (!remove) {
      unchecked.push(bag);
    }
  }

  return counted.length;
};

export const part2 = (input: Input) => {
  const rules = asRules(input);

  const unchecked = Object.keys(rules);
  const checked = [];
  const counts = {};

  while (unchecked.length > 0) {
    const bag = unchecked.shift();

    const inners = Object.keys(rules[bag]);

    if (inners.every((i) => checked.includes(i))) {
      checked.push(bag);

      counts[bag] = inners
        .map((i) => (counts[i] + 1) * rules[bag][i])
        .reduce((acc, x) => acc + x, 0);
    } else {
      unchecked.push(bag);
    }
  }

  return counts["shiny gold"];
};
