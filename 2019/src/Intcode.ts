const intcode = (program: number[], input: number[] = []) => {
  let index = 0;
  let inputIndex = 0;
  const data = [...program];
  const output: number[] = [];

  const read = (param: number, indirect: boolean) => {
    const pos = data[index + param];

    if (indirect) {
      return data[pos];
    } else {
      return pos;
    }
  };

  const write = (param: number, value: number) => {
    const pos = data[index + param];
    data[pos] = value;
  };

  const digitAt = (number: number, pos: number) => {
    return Math.floor(number / Math.pow(10, pos)) % 10;
  };

  const param = (p: number) => {
    const op = read(0, false);
    return read(p, digitAt(op, p + 1) === 0);
  };

  const calc = (op: number) => {
    switch (op) {
      case 1:
        write(3, param(1) + param(2));
        index += 4;
        return;
      case 2:
        write(3, param(1) * param(2));
        index += 4;
        return;
      case 3:
        write(1, input[inputIndex]);
        inputIndex += 1;
        index += 2;
        return;
      case 4:
        output.push(param(1));
        index += 2;
        return;
      case 5:
        if (param(1)) {
          index = param(2);
        } else {
          index += 3;
        }
        return;
      case 6:
        if (param(1) === 0) {
          index = param(2);
        } else {
          index += 3;
        }
        return;
      case 7:
        write(3, param(1) < param(2) ? 1 : 0);
        index += 4;
        return;
      case 8:
        write(3, param(1) === param(2) ? 1 : 0);
        index += 4;
        return;
      default:
        throw new Error(`Unknown opcode ${op}`);
    }
  };

  while (true) {
    const op = read(0, false);
    if (op === 99) {
      return { data, output, halt: true };
    }
    if (op % 100 === 3 && input.length === inputIndex) {
      return { data, output, halt: false };
    }

    calc(op % 100);
  }
};

export default intcode;
