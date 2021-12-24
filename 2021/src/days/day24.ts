import { Input } from "../input";

enum Op {
  inp = "inp",
  add = "add",
  mul = "mul",
  div = "div",
  mod = "mod",
  eql = "eql",
}

type Inst = {
  op: Op;
  r1: string;
  r2?: string | number;
};

const run = (insts: Inst[], input: number[]) => {
  const inp = [...input];

  const registers = { w: 0, x: 0, y: 0, z: 0 };

  insts.forEach(({ op, r1, r2 }) => {
    const getV = (v: string | number): number =>
      typeof v === "string" ? registers[v] : v;

    switch (op) {
      case Op.inp:
        registers[r1] = inp.shift();
        break;
      case Op.add:
        registers[r1] += getV(r2);
        break;
      case Op.mul:
        registers[r1] *= getV(r2);
        break;
      case Op.div:
        registers[r1] = ~~(registers[r1] / getV(r2));
        break;
      case Op.mod:
        registers[r1] = registers[r1] % getV(r2);
        break;
      case Op.eql:
        registers[r1] = registers[r1] === getV(r2) ? 1 : 0;
        break;
    }
  });

  return registers.z;
};

const solve = (input: Input, part: number) => {
  const insts: Inst[] = input.asLines().map((line) => {
    const [op, r1, r2] = line.split(" ");
    const parsed = parseInt(r2, 10);
    return { op: op as Op, r1, r2: isNaN(parsed) ? r2 : parsed };
  });

  const divisor: boolean[] = [];
  const adder1: number[] = [];
  const adder2: number[] = [];

  insts.forEach((l, i) => {
    if (i % 18 === 4) {
      divisor.push(l.r2 === 26);
    }
    if (i % 18 === 5) {
      adder1.push(l.r2 as number);
    }
    if (i % 18 === 15) {
      adder2.push(l.r2 as number);
    }
  });

  const answer: number[] = [];
  const stack: number[][] = [];

  for (let i = 0; i < 14; i++) {
    if (divisor[i]) {
      const [a, b] = stack.pop();

      for (let k = 0; k <= 9; k++) {
        const j = part === 1 ? 9 - k : k + 1;

        const n = b + adder1[i] + j;

        if (n >= 1 && n <= 9) {
          answer[a] = j;
          answer[i] = n;
          break;
        }
      }
    } else {
      stack.push([i, adder2[i]]);
    }
  }
  return parseInt(answer.join(""));
};

export const part1 = (input: Input) => solve(input, 1);

export const part2 = (input: Input) => solve(input, 2);
