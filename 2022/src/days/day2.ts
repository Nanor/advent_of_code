import { Input } from "../input";

enum Throw {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

export const part1 = (input: Input) =>
  input
    .asLines()
    .map((l) => l.trim())
    .filter((l) => l)
    .map((l) => l.split(" "))
    .map(([opp, res]) => ({
      opp: { A: Throw.Rock, B: Throw.Paper, C: Throw.Scissors }[opp],
      you: { X: Throw.Rock, Y: Throw.Paper, Z: Throw.Scissors }[res],
    }))
    .reduce((acc, { you, opp }) => {
      const res = (you - opp + 4) % 3;

      return acc + you + res * 3;
    }, 0);

enum Result {
  Loss = -1,
  Draw = 0,
  Win = 1,
}

export const part2 = (input: Input) =>
  input
    .asLines()
    .map((l) => l.trim())
    .filter((l) => l)
    .map((l) => l.split(" "))
    .map(([opp, res]) => ({
      opp: { A: Throw.Rock, B: Throw.Paper, C: Throw.Scissors }[opp],
      res: { X: Result.Loss, Y: Result.Draw, Z: Result.Win }[res],
    }))
    .reduce((acc, { opp, res }) => {
      const you = (opp + res) % 3 || 3;

      return acc + (res + 1) * 3 + you;
    }, 0);
