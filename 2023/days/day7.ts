import { Input } from "../input";

const solve = (input: Input, wild: boolean) => {
  const strengths: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    J: wild ? 0 : 11,
    T: 10,
  };

  const getStrength = (c: string): number => strengths[c] ?? parseInt(c);

  const getType = (cards: string[]): number => {
    const grouped: Record<string, number> = {};

    cards
      .filter((c) => !wild || c !== "J")
      .forEach((c) => (grouped[c] = (grouped[c] || 0) + 1));

    const counts = [...Object.values(grouped), 0, 0];
    counts.sort((a, b) => b - a);

    if (wild) counts[0] += cards.filter((c) => c === "J").length;

    return counts[0] * 5 + counts[1];
  };

  const hands = input.asLines().map((line, i) => {
    const [cs, bid] = line.split(" ");
    const cards = cs.split("");

    return { cards, bid: parseInt(bid), type: getType(cards) };
  });

  hands.sort(
    (a, b) =>
      b.type - a.type ||
      Math.sign(getStrength(b.cards[0]) - getStrength(a.cards[0])) ||
      Math.sign(getStrength(b.cards[1]) - getStrength(a.cards[1])) ||
      Math.sign(getStrength(b.cards[2]) - getStrength(a.cards[2])) ||
      Math.sign(getStrength(b.cards[3]) - getStrength(a.cards[3])) ||
      Math.sign(getStrength(b.cards[4]) - getStrength(a.cards[4]))
  );

  return hands
    .map((hand, i) => (hands.length - i) * hand.bid)
    .reduceRight((x, y) => x + y);
};

export const part1 = (input: Input) => solve(input, false);
export const part2 = (input: Input) => solve(input, true);
