type Monkey =
  | { value: number }
  | {
      left: string;
      right: string;
      op: "+" | "-" | "*" | "/";
    };

const parse = (input: Input): { [x: string]: Monkey } =>
  Object.fromEntries(
    input.asLines().map((monkey) => {
      const [id, rest] = monkey.split(": ");

      const value = parseInt(rest);
      if (!Number.isNaN(value)) return [id, { value }];

      const [left, op, right] = rest.split(" ");
      return [id, { left, op, right }];
    })
  );

const evaluate = (monkeys: { [x: string]: Monkey }, id: string): number => {
  const monkey = monkeys[id];

  if ("value" in monkey) return monkey.value;

  const left = evaluate(monkeys, monkey.left);
  const right = evaluate(monkeys, monkey.right);

  if (monkey.op === "+") return left + right;
  if (monkey.op === "-") return left - right;
  if (monkey.op === "*") return left * right;
  if (monkey.op === "/") return left / right;
};

export const part1 = (input: Input) => evaluate(parse(input), "root");

export const part2 = (input: Input) => {
  const monkeys = parse(input);

  monkeys["root"] = { ...monkeys["root"], op: "-" };
  monkeys["humn"] = { value: NaN };

  const makeEqual = (id: string, value: number) => {
    const monkey = monkeys[id];

    if ("value" in monkey) return value;

    const left = evaluate(monkeys, monkey.left);
    const right = evaluate(monkeys, monkey.right);

    if (Number.isNaN(left)) {
      if (monkey.op === "+") return makeEqual(monkey.left, value - right);
      if (monkey.op === "-") return makeEqual(monkey.left, value + right);
      if (monkey.op === "*") return makeEqual(monkey.left, value / right);
      if (monkey.op === "/") return makeEqual(monkey.left, value * right);
    }

    if (monkey.op === "+") return makeEqual(monkey.right, value - left);
    if (monkey.op === "-") return makeEqual(monkey.right, left - value);
    if (monkey.op === "*") return makeEqual(monkey.right, value / left);
    if (monkey.op === "/") return makeEqual(monkey.right, left / value);
  };

  return makeEqual("root", 0);
};
