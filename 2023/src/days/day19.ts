import type { Input } from "../input";
import { product, sum } from "../utils";

type Attribute = "x" | "m" | "a" | "s";
type Part = Record<Attribute, number>;

type Rule = {
  attribute: Attribute;
  comparison: "<" | ">";
  threshold: number;
  target: string;
};

type Workflow = {
  name: string;
  rules: Rule[];
  defaultTarget: string;
};

const parse = (
  input: Input
): { workflows: Record<string, Workflow>; parts: Part[] } => {
  const [workflows, parts] = input.asParagraphs();

  return {
    workflows: Object.fromEntries(
      workflows
        .map((wf) => {
          const [_, name, rules, defaultTarget] =
            wf.match(/(\w+){(.*),(\w+)}/)!;

          return {
            name,
            defaultTarget,
            rules: rules.split(",").map((r) => {
              const [_, attribute, comparison, threshold, target] = r.match(
                /(\w+)([<>])(\d+):(\w+)/
              )!;

              return {
                attribute: attribute as Attribute,
                comparison: comparison as "<" | ">",
                threshold: parseInt(threshold),
                target,
              };
            }),
          };
        })
        .map((w) => [w.name, w])
    ),
    parts: parts.map(
      (p) =>
        Object.fromEntries(
          p
            .slice(1, -1)
            .split(",")
            .map((s) => {
              const [attr, val] = s.split("=");
              return [attr as Attribute, parseInt(val)];
            })
        ) as Part
    ),
  };
};

const evaluate = (part: Part, workflow: Workflow): string => {
  for (const rule of workflow.rules) {
    if (
      (rule.comparison === "<" && part[rule.attribute] < rule.threshold) ||
      (rule.comparison === ">" && part[rule.attribute] > rule.threshold)
    )
      return rule.target;
  }

  return workflow.defaultTarget;
};

export const part1 = (input: Input) => {
  const { workflows, parts } = parse(input);

  const run = (part: Part, step = "in"): Boolean => {
    if (step === "A") return true;
    if (step === "R") return false;
    return run(part, evaluate(part, workflows[step]));
  };

  return parts
    .filter((part) => run(part))
    .flatMap((p) => Object.values(p))
    .reduce(sum);
};

type PartRange = Record<Attribute, { min: number; max: number }>;

const split = (
  ranges: PartRange[],
  workflow: Workflow
): Record<string, PartRange[]> => {
  const out: Record<string, PartRange[]> = {};

  for (const rule of workflow.rules) {
    ranges = ranges.map((r) => {
      out[rule.target] = [
        ...(out[rule.target] ?? []),
        {
          ...r,
          [rule.attribute]:
            rule.comparison === "<"
              ? {
                  min: r[rule.attribute].min,
                  max: rule.threshold,
                }
              : {
                  min: rule.threshold + 1,
                  max: r[rule.attribute].max,
                },
        },
      ];

      return {
        ...r,
        [rule.attribute]:
          rule.comparison === "<"
            ? {
                min: rule.threshold,
                max: r[rule.attribute].max,
              }
            : {
                min: r[rule.attribute].min,
                max: rule.threshold + 1,
              },
      };
    });
  }

  out[workflow.defaultTarget] = [
    ...(out[workflow.defaultTarget] ?? []),
    ...ranges,
  ];

  return out;
};

export const part2 = (input: Input) => {
  const { workflows } = parse(input);

  const run = (ranges: PartRange[], step = "in"): PartRange[] =>
    Object.entries(split(ranges, workflows[step])).flatMap(([k, v]) => {
      if (k === "A") return v;
      else if (k === "R") return [];
      return run(v, k);
    });

  return run([
    {
      x: { min: 1, max: 4001 },
      m: { min: 1, max: 4001 },
      a: { min: 1, max: 4001 },
      s: { min: 1, max: 4001 },
    },
  ])
    .map((range) =>
      Object.values(range)
        .map((r) => r.max - r.min)
        .reduce(product)
    )
    .reduce(sum);
};
