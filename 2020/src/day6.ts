import { Input } from "./input";

const asGroups = (input: Input): { counts: Object; total: Number }[] => {
  let currGroup = [];
  const groups = [];

  input.asLines().forEach((line) => {
    if (line === "") {
      groups.push(currGroup);
      currGroup = [];
    } else {
      currGroup.push(line);
    }
  });
  if (currGroup.length > 0) {
    groups.push(currGroup);
  }

  return groups.map((group) => {
    const counts = group.reduce((acc: Object, curr: String) => {
      curr.split("").forEach((c) => (acc[c] = (acc[c] || 0) + 1));
      return acc;
    }, {});

    return { counts, total: group.length };
  });
};

export const part1 = (input: Input) => {
  const groups = asGroups(input);

  return groups
    .map((o) => Object.keys(o.counts).length)
    .reduce((acc, x) => acc + x, 0);
};

export const part2 = (input: Input) => {
  const groups = asGroups(input);

  return groups
    .map((o) => Object.values(o.counts).filter((v) => v === o.total).length)
    .reduce((acc, x) => acc + x, 0);
};
