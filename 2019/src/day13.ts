import { Input } from "./types";
import intcode, { run } from "./Intcode";

export const part1 = (input: Input) => {
  const comp = intcode(input.asNumberArray());

  let blocks = 0;
  for (let n = 0; n < comp.output.length; n += 3) {
    const [x, y, id] = comp.output.slice(n, n + 3);

    if (id === 2) {
      blocks += 1;
    }
  }

  return blocks;
};

const graphics = {
  0: " ",
  1: "#",
  2: "◻︎",
  3: "-",
  4: "*"
};

const draw = (board: number[][], score: number) => {
  let out = `${score}\n`;

  board.forEach(line => {
    line.forEach(c => {
      out += graphics[c];
    });
    out += "\n";
  });

  console.log(out);
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();
  data[0] = 2;
  let comp = intcode(data);

  const board = [];
  let ballX: number;
  let paddleX: number;
  let score: number;

  while (true) {
    for (let n = 0; n < comp.output.length; n += 3) {
      const [x, y, id] = comp.output.slice(n, n + 3);

      if (x === -1 && y === 0) score = id;

      if (!board[y]) board[y] = [];

      board[y][x] = id;

      if (id === 3) paddleX = x;
      if (id === 4) ballX = x;
    }

    // draw(board, score);

    const input = ballX < paddleX ? [-1] : ballX > paddleX ? [1] : [0];

    if (comp.halted) break;
    comp = run({ ...comp, input, output: [] });
  }

  return score;
};
