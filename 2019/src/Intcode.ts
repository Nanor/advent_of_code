export interface Intcode {
  data: number[];
  input: number[];
  output: number[];
  index: number;
  halted: boolean;
}

export const create = (data: number[], input = []): Intcode => ({
  data,
  input,
  output: [],
  index: 0,
  halted: false
});

const write = (intcode: Intcode, param: number, value: number): Intcode => {
  const { data, index } = intcode;
  const pos = data[index + param];

  return { ...intcode, data: data.map((x, i) => (i === pos ? value : x)) };
};

const read = (intcode: Intcode, param: number, indirect: boolean): number => {
  const { data, index } = intcode;
  const pos = data[index + param];

  if (indirect) {
    return data[pos];
  } else {
    return pos;
  }
};

const digitAt = (number: number, pos: number) => {
  return Math.floor(number / Math.pow(10, pos)) % 10;
};

const param = (intcode: Intcode, p: number): number => {
  const op = read(intcode, 0, false);
  return read(intcode, p, digitAt(op, p + 1) === 0);
};

const increment = (intcode: Intcode): Intcode => ({
  ...intcode,
  index:
    intcode.index +
    {
      1: 4,
      2: 4,
      3: 2,
      4: 2,
      5: 3,
      6: 3,
      7: 4,
      8: 4
    }[read(intcode, 0, false) % 100]
});

export const step = (intcode: Intcode): Intcode => {
  let { input, output } = intcode;

  const op = read(intcode, 0, false);

  switch (op % 100) {
    case 1:
      return increment(
        write(intcode, 3, param(intcode, 1) + param(intcode, 2))
      );
    case 2:
      return increment(
        write(intcode, 3, param(intcode, 1) * param(intcode, 2))
      );
    case 3:
      return increment(write(intcode, 1, input.shift()));
    case 4:
      return increment({ ...intcode, output: [...output, param(intcode, 1)] });
    case 5:
      if (param(intcode, 1)) {
        return { ...intcode, index: param(intcode, 2) };
      } else {
        return increment(intcode);
      }
    case 6:
      if (param(intcode, 1) === 0) {
        return { ...intcode, index: param(intcode, 2) };
      } else {
        return increment(intcode);
      }
    case 7:
      return increment(
        write(intcode, 3, param(intcode, 1) < param(intcode, 2) ? 1 : 0)
      );
    case 8:
      return increment(
        write(intcode, 3, param(intcode, 1) === param(intcode, 2) ? 1 : 0)
      );
    default:
      throw new Error(`Unknown opcode ${op}`);
  }
};

export const run = (intcode: Intcode): Intcode => {
  let curr = intcode;

  while (true) {
    const op = read(curr, 0, false);
    if (op === 99) {
      return { ...curr, halted: true };
    }
    if (op % 100 === 3 && curr.input.length === 0) {
      return { ...curr, halted: false };
    }

    curr = step(curr);
  }
};

export default (data: number[], input: number[]) => run(create(data, input));
