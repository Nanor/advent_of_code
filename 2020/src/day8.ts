import { Input } from "./input";

export const part1 = (input: Input) => {
  const code = input.asLines();

  const instrs = code.map((c) => {
    const [op, val] = c.split(" ");
    return {
      op,
      val: parseInt(val),
    };
  });

  let ip = 0;
  let acc = 0;
  let visited = {};

  while (!(ip in visited)) {
    visited[ip] = true;

    switch (instrs[ip].op) {
      case "nop":
        ip += 1;
        break;
      case "acc":
        acc += instrs[ip].val;
        ip += 1;
        break;
      case "jmp":
        ip += instrs[ip].val;
        break;
    }
  }

  return acc;
};

export const part2 = (input: Input) => {
  const code = input.asLines();

  const instrs = code.map((c) => {
    const [op, val] = c.split(" ");
    return {
      op,
      val: parseInt(val),
    };
  });

  return instrs
    .map(({ op, val }, i) => {
      let newInstrs = instrs;
      if (op === "nop") {
        newInstrs = instrs.map((ins, j) =>
          i === j ? { op: "jmp", val } : ins
        );
      } else if (op === "jmp") {
        newInstrs = instrs.map((ins, j) =>
          i === j ? { op: "nop", val } : ins
        );
      }

      let ip = 0;
      let acc = 0;
      let visited = {};

      while (!(ip in visited)) {
        visited[ip] = true;

        if (ip === newInstrs.length) {
          return acc;
        }

        switch (newInstrs[ip].op) {
          case "nop":
            ip += 1;
            break;
          case "acc":
            acc += newInstrs[ip].val;
            ip += 1;
            break;
          case "jmp":
            ip += newInstrs[ip].val;
            break;
        }
      }
    })
    .filter((x) => x)[0];
};
