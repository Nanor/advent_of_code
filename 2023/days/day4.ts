import { Input } from "../input";
import { sum } from "../utils";

const parse = (input: Input) => {
  return input.asLines().map((line) => {
    const parts = line.split(/[:|]/);

    return {
      winning: parts[1].split(" ").filter(Boolean),
      actual: parts[2].split(" ").filter(Boolean),
    };
  });
};

export const part1 = (input: Input) =>
  parse(input)
    .map((card) => card.actual.filter((n) => card.winning.includes(n)).length)
    .map((count) => (count ? Math.pow(2, count - 1) : 0))
    .reduce(sum);

export const part2 = (input: Input) => {
  const cards = parse(input).map((c) => ({ ...c, count: 1 }));

  cards.forEach((card, i) => {
    const winnings = card.actual.filter((n) => card.winning.includes(n)).length;

    cards
      .slice(i + 1, i + 1 + winnings)
      .forEach((c) => (c.count += card.count));
  });

  return cards.map((card) => card.count).reduce(sum);
};
