import { Input } from "../input";

const parse = (input: Input) => {
  const [stackInput, moveInput] = input.asParagraphs();

  stackInput.reverse();

  const size = parseInt(stackInput[0].match(/\d+/g).pop(), 10);

  const stacks: string[][] = [...Array(size)].map(() => []);

  stackInput.slice(1).forEach((l) => {
    const crates = l.matchAll(/\[(\w)\]/g);

    let crate = crates.next();

    while (!crate.done) {
      const { 1: id, index } = crate.value;

      stacks[index / 4].push(id);

      crate = crates.next();
    }
  });

  const moves = moveInput.filter(Boolean).map((m) => {
    const [_, count, from, to] = m.match(/move (\d+) from (\d+) to (\d+)/);

    return {
      count: parseInt(count, 10),
      from: parseInt(from, 10) - 1,
      to: parseInt(to, 10) - 1,
    };
  });
  return { moves, stacks };
};

export const part1 = (input: Input) => {
  const { moves, stacks } = parse(input);

  moves.forEach(({ count, from, to }) => {
    for (let i = 0; i < count; i++) {
      stacks[to].push(stacks[from].pop());
    }
  });

  return stacks.map((s) => s.pop()).join("");
};

export const part2 = (input: Input) => {
  const { moves, stacks } = parse(input);

  moves.forEach(({ count, from, to }) => {
    stacks[to].push(...stacks[from].splice(stacks[from].length - count, count));
  });

  return stacks.map((s) => s.pop()).join("");
};
