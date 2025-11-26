import { Input } from "../input";

type Value = Value[] | number;

const parse = (s: string): Value => {
  if (s.match(/^[0-9\,\[\]]+$/)) {
    return eval(s);
  }

  throw Error(`Invalid characters in string: "${s}"`);
};

const compare = (left: Value, right: Value): number => {
  if (typeof left === "number" && typeof right === "number") {
    return Math.sign(left - right);
  }

  left = typeof left === "number" ? [left] : left;
  right = typeof right === "number" ? [right] : right;

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (i >= left.length) return -1;
    if (i >= right.length) return 1;

    const cmp = compare(left[i], right[i]);
    if (cmp !== 0) return cmp;
  }

  return 0;
};

export const part1 = (input: Input) => {
  let sum = 0;

  input.asParagraphs().forEach(([l, r], index) => {
    if (compare(parse(l), parse(r)) < 0) {
      sum += index + 1;
    }
  });

  return sum;
};

export const part2 = (input: Input) => {
  const packets = input.asLines().map((i) => parse(i));

  packets.push([[2]], [[6]]);

  packets.sort((a, b) => compare(a, b));

  const a = packets.findIndex((x) => JSON.stringify(x) === "[[2]]") + 1;
  const b = packets.findIndex((x) => JSON.stringify(x) === "[[6]]") + 1;

  return a * b;
};
