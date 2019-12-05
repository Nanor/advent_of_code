const intcode = (program: number[], input: number[] = []) => {
  let index = 0;
  const data = [...program];

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

  const calc = (op: number, vals: number[]) => {
    let res: number;
    switch (op) {
      case 1:
        res = vals[0] + vals[1];
        write(3, res);
        index += 4;
        return;
      case 2:
        res = vals[0] * vals[1];
        write(3, res);
        index += 4;
        return;
      case 3:
        write(1, input[0]);
        index += 2;
        return;
      case 4:
        console.log(vals[0]);
        index += 2;
        return;
      case 5:
        if (vals[0]) {
          index = vals[1];
        } else {
          index += 3
        }
        return;
      case 6:
        if (vals[0] === 0) {
          index = vals[1];
        } else {
          index += 3
        }
        return;
      case 7:
        write(3, vals[0] < vals[1] ? 1 : 0);
        index += 4;
        return;
      case 8:
        write(3, vals[0] === vals[1] ? 1 : 0);
        index += 4;
        return;
      default:
        throw new Error(`Unknown opcode ${op}`);
    }
  };

  const digitAt = (number: number, pos: number) => {
    return Math.floor(number / Math.pow(10, pos)) % 10;
  };

  while (true) {
    const op = read(0, false);
    if (op === 99) {
      return data;
    }

    const val1 = read(1, digitAt(op, 2) === 0);
    const val2 = read(2, digitAt(op, 3) === 0);

    calc(op % 100, [val1, val2]);
  }
};

export default intcode;
