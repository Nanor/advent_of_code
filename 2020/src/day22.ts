import { Input } from "./input";

const score = (deck: number[]) =>
  deck.map((x, i) => x * (deck.length - i)).reduce((x, y) => x + y, 0);

export const part1 = (input: Input) => {
  const players = input
    .asParagraphs()
    .map((ls) => ls.slice(1).map((x) => parseInt(x)));

  while (players[0].length > 0 && players[1].length > 0) {
    const c1 = players[0].shift();
    const c2 = players[1].shift();

    const winner = c1 > c2 ? 0 : 1;

    players[winner].push(Math.max(c1, c2), Math.min(c1, c2));
  }

  const deck = players[0].length ? players[0] : players[1];

  return score(deck);
};

const combat = (
  decks: [number[], number[]]
): { winner: 0 | 1; decks: [number[], number[]] } => {
  const seen = new Set();

  while (true) {
    const hash = `${score(decks[0])},${score(decks[1])}`;
    if (seen.has(hash)) {
      return { winner: 0, decks };
    }
    seen.add(hash);

    const c1 = decks[0].shift();
    const c2 = decks[1].shift();

    let winner: 0 | 1;

    if (c1 > decks[0].length || c2 > decks[1].length) {
      winner = c1 > c2 ? 0 : 1;
    } else {
      winner = combat([decks[0].slice(0, c1), decks[1].slice(0, c2)]).winner;
    }

    decks[winner].push(winner === 0 ? c1 : c2, winner === 0 ? c2 : c1);

    if (decks[0].length === 0 || decks[1].length === 0) {
      return { winner, decks };
    }
  }
};

export const part2 = (input: Input) => {
  const [p1, p2] = input
    .asParagraphs()
    .map((ls) => ls.slice(1).map((x) => parseInt(x)));

  const { winner, decks } = combat([p1, p2]);

  return score(decks[winner]);
};
