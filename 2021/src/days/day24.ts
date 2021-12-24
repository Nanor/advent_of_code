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

  const min = 1111111;
  const max = 9999999;
  for (let j = min; j <= max; j++) {
    const i = part === 1 ? max - j : j;

    const inp = `${i}`.split("").map((d) => parseInt(d));
    if (inp.includes(0)) continue;

    const output = [];

    let z = 0;

    try {
      for (let i = 0; i < 14; i++) {
        if (divisor[i]) {
          const x = (z % 26) + adder1[i];

          if (x < 1 || x > 9) throw Error("Bad input");

          output.push(x);
          z = ~~(z / 26);
        } else {
          const w = inp.shift();
          z = z * 26 + w + adder2[i];

          output.push(w);
        }
      }
    } catch {
      continue;
    }

    if (z === 0) {
      return parseInt(output.join(""));
    }
  }
};

export const part1 = (input: Input) => solve(input, 1);

export const part2 = (input: Input) => solve(input, 2);
