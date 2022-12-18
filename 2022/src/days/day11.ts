type Monkey = {
  index: number;
  count: number;
  items: number[];
  func: (n: number) => { monkey: number; worry: number };
};

const solve = (input: Input, rounds: number, doDiv: boolean) => {
  const allDivs = input
    .asMatches(/Test: divisible by (\d+)/g)
    .map((m) => parseInt(m[1]));
  const modulo = allDivs.reduce((x, a) => x * a, 1);

  const monkeys = input
    .asMatchGroups(
      /Monkey (?<index>\d+):\n  Starting items: (?<items>[0-9, ]+)\n. Operation: new = (?<left>\w+) (?<op>[+*]) (?<right>\w+)\n  Test: divisible by (?<div>\d+)\n.   If true: throw to monkey (?<true>\d+)\n    If false: throw to monkey (?<false>\d+)/gm
    )
    .map((m) => {
      const items = m.items.split(", ").map((n) => parseInt(n));

      const testDiv = parseInt(m.div);
      const trueMonkey = parseInt(m.true);
      const falseMonkey = parseInt(m.false);

      const l = m.left !== "old" ? parseInt(m.left) : null;
      const r = m.right !== "old" ? parseInt(m.right) : null;

      const func: Monkey["func"] = (oldLevel) => {
        const left = l ?? oldLevel;
        const right = r ?? oldLevel;

        const res1 = m.op === "*" ? left * right : left + right;
        const res2 = doDiv ? Math.floor(res1 / 3) : res1;
        const res3 = res2 % modulo;

        const nextMonkey = res3 % testDiv === 0 ? trueMonkey : falseMonkey;

        return { monkey: nextMonkey, worry: res3 };
      };

      return {
        index: m.index,
        count: 0,
        items,
        func,
      };
    });

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        monkey.count += 1;

        const { monkey: nextMonkey, worry: nextItem } = monkey.func(item);

        monkeys[nextMonkey].items.push(nextItem);
      }
    });
  }

  const throws = monkeys.map((m) => m.count);
  throws.sort((a, b) => b - a);

  return throws[0] * throws[1];
};

export const part1 = (input: Input) => solve(input, 20, true);
export const part2 = (input: Input) => solve(input, 10000, false);
