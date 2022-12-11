import { Input } from "../input";

type Monkey = {
  index: number;
  count: number;
  items: number[];
  func: (n: number) => { monkey: number; worry: number };
};

const solve = (input: Input, rounds: number, doDiv: boolean) => {
  const allDivs = input
    .asLines()
    .filter((l) => l.match(/Test: divisible by/))
    .map((x) => parseInt(x.match(/\d+/)[0]));

  const modulo = allDivs.reduce((x, a) => x * a, 1);

  const monkeys: Monkey[] = input.asParagraphs().map((lines) => {
    const index = parseInt(lines[0].match(/Monkey (\d+):/)[1]);
    const items = lines[1]
      .match(/Starting items: ((?:\d+(?:, )?)+)$/)[1]
      .split(", ")
      .map((n) => parseInt(n));

    const [_, x, op, y] = lines[2].match(/Operation: new = (\w+) ([*+]) (\w+)/);
    const testDiv = parseInt(lines[3].match(/Test: divisible by (\d+)/)[1]);
    const trueMonkey = parseInt(
      lines[4].match(/If true: throw to monkey (\d+)/)[1]
    );
    const falseMonkey = parseInt(
      lines[5].match(/If false: throw to monkey (\d+)/)[1]
    );

    const l = x !== "old" ? parseInt(x) : null;
    const r = y !== "old" ? parseInt(y) : null;

    const func: Monkey["func"] = (oldLevel) => {
      const left = l ?? oldLevel;
      const right = r ?? oldLevel;

      const res1 = op === "*" ? left * right : left + right;
      const res2 = doDiv ? Math.floor(res1 / 3) : res1;
      const res3 = res2 % modulo;

      const nextMonkey = res3 % testDiv === 0 ? trueMonkey : falseMonkey;

      return { monkey: nextMonkey, worry: res3 };
    };

    return {
      index,
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
