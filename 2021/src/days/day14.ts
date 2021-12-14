import { Input } from "../input";

const calculate = (input: Input, totalTimes: number): number => {
  const [[t], ps] = input.asParagraphs();

  let template = t.split("");
  const pairs = ps.reduce<{ [x: string]: string[] }>((acc, p) => {
    const [l, r] = p.split(" -> ");
    return { ...acc, [l]: [l[0], r, l[1]] };
  }, {});

  const allCounts: { [y: string]: { [x: string]: number } }[] = [];

  const expand = (ps: string[], times = 1): { [x: string]: number } => {
    allCounts[times] = allCounts[times] || {};

    const key = ps.join("");

    if (allCounts[times][key]) {
      return allCounts[times][key];
    }

    if (times === 0) {
      return { [ps[0]]: 1 };
    }

    const counts = expandAll(pairs[key], times - 1);

    allCounts[times][key] = counts;

    return counts;
  };

  const expandAll = (ps: string[], times = 1): { [x: string]: number } => {
    let counts = {};

    for (let i = 0; i < ps.length - 1; i++) {
      const p = ps.slice(i, i + 2);

      const count = expand(p, times);

      Object.entries(count).forEach(([k, v]) => {
        counts[k] = (counts[k] || 0) + v;
      });
    }

    return counts;
  };

  const counts = expandAll(template, totalTimes);

  counts[template[template.length - 1]] += 1;

  return (
    Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
  );
};

export const part1 = (input: Input) => calculate(input, 10);
export const part2 = (input: Input) => calculate(input, 40);
