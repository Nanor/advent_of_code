import { Input } from "./input";

const applyMaskValue = (mask: string, val: number): number => {
  const binary = val.toString(2).padStart(36, "0");

  const masked = binary
    .split("")
    .map((x, i) => (mask[i] === "X" ? x : mask[i]))
    .join("");

  return parseInt(masked, 2);
};

export const part1 = (input: Input) => {
  let mem = {};
  let mask: string;

  input.asLines().forEach((line) => {
    const m = line.match(/mask = ([01X]+)/);
    if (m) {
      mask = m[1];
    } else {
      const [_, addr, val] = line.match(/mem\[(\d+)\] = (\d+)/);

      mem[addr] = applyMaskValue(mask, parseInt(val, 10));
    }
  });

  const values: number[] = Object.values(mem);
  return values.reduce((x, y) => x + y, 0);
};

const applyMaskAddr = (mask: string, addr: number): number[] => {
  const binary = addr.toString(2).padStart(36, "0");

  const masked = binary
    .split("")
    .map((x, i) => (mask[i] === "0" ? x : mask[i]));

  const resolve = (addr: string[]): string[][] => {
    if (addr.includes("X")) {
      const index = addr.indexOf("X");

      return [
        ...resolve(addr.map((x, i) => (i === index ? "0" : x))),
        ...resolve(addr.map((x, i) => (i === index ? "1" : x))),
      ];
    } else {
      return [addr];
    }
  };

  const addrs = resolve(masked).map((x) => parseInt(x.join(""), 2));
  return addrs;
};

export const part2 = (input: Input) => {
  let mem = {};
  let mask: string;

  input.asLines().forEach((line) => {
    const m = line.match(/mask = ([01X]+)/);
    if (m) {
      mask = m[1];
    } else {
      const [_, addr, val] = line.match(/mem\[(\d+)\] = (\d+)/);

      applyMaskAddr(mask, parseInt(addr, 10)).forEach((a) => {
        mem[a] = parseInt(val, 10);
      });
    }
  });

  const values: number[] = Object.values(mem);
  return values.reduce((x, y) => x + y, 0);
};
