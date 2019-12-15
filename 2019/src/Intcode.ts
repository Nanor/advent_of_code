export interface Intcode {
  data: number[];
  input: number[];
  output: number[];
  index: number;
  halted: boolean;
  relativeBase: number;
}

export const create = (data: number[], input = []): Intcode => ({
  data: [...data],
  input,
  output: [],
  index: 0,
  halted: false,
  relativeBase: 0
});

const write = (intcode: Intcode, param: number, value: number): Intcode => {
  const mode = digitAt(getOpCode(intcode), param + 1);

  const { data, index, relativeBase } = intcode;
  const pos = data[index + param];

  if (mode === 0) {
    data[pos] = value;
  } else if (mode === 2) {
    data[pos + relativeBase] = value;
  } else {
    throw new Error(`Unknown write mode ${mode}`);
  }

  return { ...intcode, data };
};

const read = (intcode: Intcode, param: number, mode: number): number => {
  const { data, index, relativeBase } = intcode;
  const pos = data[index + param] || 0;

  if (mode === 0) {
    return data[pos] || 0;
  } else if (mode === 1) {
    return pos;
  } else if (mode === 2) {
    return data[pos + relativeBase] || 0;
  } else {
    throw new Error(`Unknown read mode ${mode}`);
  }
};

const getOpCode = (intcode: Intcode) => read(intcode, 0, 1);

const digitAt = (number: number, pos: number) => {
  return Math.floor(number / Math.pow(10, pos)) % 10;
};

const param = (intcode: Intcode, p: number): number => {
  const op = getOpCode(intcode);
  return read(intcode, p, digitAt(op, p + 1));
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
      8: 4,
      9: 2
    }[getOpCode(intcode) % 100]
});

const changeBase = (intcode: Intcode, val: number): Intcode => ({
  ...intcode,
  relativeBase: intcode.relativeBase + val
});

export const step = (intcode: Intcode): Intcode => {
  let { input, output } = intcode;

  const op = getOpCode(intcode);
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
    case 9:
      return increment(changeBase(intcode, param(intcode, 1)));
    default:
      throw new Error(`Unknown opcode ${op}`);
  }
};

export const run = (intcode: Intcode): Intcode => {
  let curr = intcode;

  while (true) {
    const op = getOpCode(curr);
    if (op === 99) {
      return { ...curr, halted: true };
    }
    if (op % 100 === 3 && curr.input.length === 0) {
      return { ...curr, halted: false };
    }

    curr = step(curr);
  }
};

export default (data: number[], input: number[] = []) =>
  run(create(data, input));

export const withInput = (intcode: Intcode, input: number[]): Intcode =>
  run({ ...intcode, input, output: [] });
