import { Input } from "../input";

const parse = (input: Input) => {
  const [[nums], ...boardStrings] = input.asParagraphs();

  const numbers = nums.split(",").map((x) => parseInt(x, 10));
  const boards = boardStrings.map((bString) =>
    bString.map((line) =>
      line
        .split(" ")
        .filter(Boolean)
        .map((x) => parseInt(x, 10))
    )
  );

  const scores = boards.map((board) => play(numbers, board));

  return { numbers, boards, scores };
};

const hasWon = (marks: boolean[][]): boolean =>
  marks.some((line) => line.every(Boolean)) ||
  marks.some((line, x) => line.every((_, y) => marks[y][x]));

const play = (
  numbers: number[],
  board: number[][]
): { moves: number; score: number } => {
  let moves = 0;

  const marks = board.map((line) => line.map(() => false));

  for (const num of numbers) {
    moves += 1;

    board.forEach((line, y) => {
      if (line.indexOf(num) >= 0) {
        marks[y][line.indexOf(num)] = true;
      }
    });

    if (hasWon(marks)) {
      return {
        moves,
        score:
          num *
          board
            .flat()
            .filter((_, i) => !marks.flat()[i])
            .reduce((x, y) => x + y),
      };
    }
  }

  return { moves, score: 0 };
};

export const part1 = (input: Input) => {
  const { scores } = parse(input);

  return scores.reduceRight((acc, x) => (acc.moves < x.moves ? acc : x)).score;
};

export const part2 = (input: Input) => {
  const { scores } = parse(input);

  return scores.reduceRight((acc, x) => (acc.moves > x.moves ? acc : x)).score;
};
