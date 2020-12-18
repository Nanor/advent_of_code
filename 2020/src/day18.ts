import { Input } from "./input";

export const evaluate1 = (expr: string): number => {
  if (expr.match(/^\d+$/)) {
    return parseInt(expr);
  }

  expr = expr.replace(/\((\d+)\)/, "$1");

  const [first] = expr.match(/\d+ [+*] \d+/);

  const evald = eval(first);

  return evaluate1(expr.replace(first, evald));
};

export const part1 = (input: Input) =>
  input
    .asLines()
    .map((l) => evaluate1(l))
    .reduce((x, y) => x + y, 0);

export const evaluate2 = (expr: string): number => {
  if (expr.match(/^\d+$/)) {
    return parseInt(expr);
  }

  const sub = expr.match(/\(([^())]+)\)/);
  if (sub) {
    const evald = evaluate2(sub[1]);

    return evaluate2(expr.replace(sub[0], `${evald}`));
  }

  const first = expr.match(/\d+ \+ \d+/);

  if (first) {
    const evald = eval(first[0]);

    return evaluate2(expr.replace(first[0], evald));
  }

  const second = expr.match(/\d+ \* \d+/);
  if (second) {
    const evald = eval(second[0]);

    return evaluate2(expr.replace(second[0], evald));
  }
};

export const part2 = (input: Input) =>
  input
    .asLines()
    .map((l) => evaluate2(l))
    .reduce((x, y) => x + y, 0);
