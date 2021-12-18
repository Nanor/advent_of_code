import { Input } from "../input";

type Snumber = [Snumber | number, Snumber | number];

export const parse = (s: string): Snumber => JSON.parse(s);

export const explode = (s: Snumber): Snumber => {
  const addTo = (
    s: Snumber | number,
    x: number,
    dir: "left" | "right"
  ): Snumber | number => {
    if (typeof s === "number") return s + x;

    if (dir === "left") {
      return [addTo(s[0], x, "left"), s[1]];
    }

    return [s[0], addTo(s[1], x, "right")];
  };

  const inner = (
    [a, b]: Snumber,
    depth = 0
  ): [number, Snumber | number, number] => {
    if (depth === 4) return [a as number, 0, b as number];

    const l = typeof a !== "number" && inner(a, depth + 1);
    const r = typeof b !== "number" && inner(b, depth + 1);

    if (l) {
      return [l[0], [l[1], addTo(b, l[2], "left")], 0];
    }

    if (r) {
      return [0, [addTo(a, r[0], "right"), r[1]], r[2]];
    }
  };

  const res = inner(s);
  if (res) return inner(s)[1] as Snumber;
};

export const split = ([a, b]: Snumber): Snumber => {
  if (typeof a === "number" && a >= 10)
    return [[Math.floor(a / 2), Math.ceil(a / 2)], b];

  const l = typeof a !== "number" && split(a);
  if (l) return [l, b];

  if (typeof b === "number" && b >= 10)
    return [a, [Math.floor(b / 2), Math.ceil(b / 2)]];

  const r = typeof b !== "number" && split(b);
  if (r) return [a, r];
};

export const add = (a: Snumber, b: Snumber): Snumber => {
  const reduce = (s: Snumber): Snumber => {
    const exp = explode(s);
    if (exp) return reduce(exp);

    const spl = split(s);
    if (spl) return reduce(spl);

    return s;
  };

  return reduce([a, b]);
};

const magnitude = (s: Snumber | number): number => {
  if (typeof s === "number") return s;

  return magnitude(s[0]) * 3 + magnitude(s[1]) * 2;
};

export const part1 = (input: Input) => {
  const result = input.asLines().reduce<Snumber>((acc, x) => {
    if (acc === undefined) return parse(x);
    return add(acc, parse(x));
  }, undefined);

  return magnitude(result);
};

export const part2 = (input: Input) => {
  const nums = input.asLines().map(parse);

  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        const value = magnitude(add(nums[i], nums[j]));
        max = Math.max(max, value);
      }
    }
  }

  return max;
};
