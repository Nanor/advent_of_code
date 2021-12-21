import { Input } from "../input";

function* detDice() {
  while (true) {
    for (let i = 1; i <= 100; i++) {
      yield i;
    }
  }
}

export const part1 = (input: Input) => {
  const scores = [0, 0];
  let rolls = 0;

  const positions = input
    .asLines()
    .map((l) => parseInt(l.match(/Player \d starting position: (\d)/)[1], 10));

  const dice = detDice();

  let player = 0;

  while (scores.every((s) => s < 1000)) {
    const roll = [...Array(3)]
      .map(() => dice.next().value as number)
      .reduce((x, y) => x + y);
    rolls += 3;

    positions[player] = (positions[player] + roll) % 10 || 10;
    scores[player] += positions[player];

    player = player ? 0 : 1;
  }

  return Math.min(...scores) * rolls;
};

type Player = {
  position: number;
  score: number;
};

type State = {
  players: Player[];
  count: number;
};

const stateEqual = (s1: Player[], s2: Player[]): boolean => {
  return (
    s1[0].position === s2[0].position &&
    s1[0].score === s2[0].score &&
    s1[1].position === s2[1].position &&
    s1[1].score === s2[1].score
  );
};

export const part2 = (input: Input) => {
  const starts = input
    .asLines()
    .map((l) => parseInt(l.match(/Player \d starting position: (\d)/)[1], 10));

  const rs = {};
  [1, 2, 3].forEach((x) =>
    [1, 2, 3].forEach((y) =>
      [1, 2, 3].forEach((z) => {
        const v = x + y + z;
        rs[v] = (rs[v] || 0) + 1;
      })
    )
  );
  const rolls = Object.entries(rs).map(([k, v]) => [
    parseInt(k),
    v,
  ]) as number[][];

  let states: State[] = [
    { players: starts.map((position) => ({ position, score: 0 })), count: 1 },
  ];

  let player = 0;
  const wins = [0, 0];

  while (states.length > 0) {
    const newStates: State[] = [];

    states.forEach((state) => {
      rolls.forEach(([r, c]) => {
        const newPlayers = state.players.map((p, i) => {
          const position = (p.position + r) % 10 || 10;
          return player === i
            ? {
                position,
                score: p.score + position,
              }
            : p;
        });

        if (newPlayers[0].score >= 21) {
          wins[0] += c * state.count;
        } else if (newPlayers[1].score >= 21) {
          wins[1] += c * state.count;
        } else {
          const newState = newStates.find((s) =>
            stateEqual(s.players, newPlayers)
          );

          if (newState) {
            newState.count += c * state.count;
          } else {
            newStates.push({ players: newPlayers, count: c * state.count });
          }
        }
      });
    });

    states = newStates;
    player = player ? 0 : 1;
  }

  return Math.max(...wins);
};
