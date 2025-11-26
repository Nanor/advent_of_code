import { Input } from "../input";

const render = (
  input: Input,
  time: number,
  callback: (xReg: number, cycle: number) => void
) => {
  const insts = input.asLines().filter(Boolean);
  let xReg = 1;
  let cycle = 1;
  let pc = 0;

  const draw = () => {
    callback(xReg, cycle);
    cycle += 1;
  };

  while (cycle <= time) {
    const inst = insts[pc % insts.length];

    draw();

    if (inst !== "noop") {
      const v = parseInt(inst.split(" ")[1], 10);
      draw();
      xReg += v;
    }

    pc += 1;
  }
};

export const part1 = (input: Input) => {
  const history = [];

  const callback = (xReg: number, cycle: number) => {
    history[cycle] = xReg;
  };

  render(input, 220, callback);

  return [20, 60, 100, 140, 180, 220].reduce(
    (acc, c) => c * history[c] + acc,
    0
  );
};

export const part2 = (input: Input) => {
  const width = 40;
  const height = 6;

  let output = "";

  const callback = (xReg: number, cycle: number) => {
    output += Math.abs(xReg - ((cycle - 1) % width)) <= 1 ? "#" : ".";
    if (cycle % width === 0) {
      output += "\n";
    }
  };

  render(input, width * height, callback);
  return output;
};
