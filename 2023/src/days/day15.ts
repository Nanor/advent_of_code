import { Input } from "../input";
import { sum } from "../utils";

export const hash = (string: string): number =>
  string.split("").reduce((acc, c) => ((acc + c.charCodeAt(0)) * 17) % 256, 0);

export const part1 = (input: Input) =>
  input.asString().split(",").map(hash).reduce(sum);

type Lens = { fLength: number; label: string };

export const part2 = (input: Input) => {
  const boxes: Lens[][] = [...Array(256)].map(() => []);

  input
    .asString()
    .split(",")
    .forEach((inst) => {
      const m = inst.match(/(\w+)([-=])(\d)?/);
      if (m) {
        const [_, label, op, f] = m;
        const fLength = parseInt(f);
        const box = hash(label);

        if (op === "-") {
          boxes[box] = boxes[box].filter((l) => l.label !== label);
        } else {
          const lens = boxes[box].find((l) => l.label === label);
          if (lens) {
            lens.fLength = fLength;
          } else {
            boxes[box].push({ fLength, label });
          }
        }
      }
    });

  return boxes
    .flatMap((box, i) => box.map((lens, j) => (i + 1) * (j + 1) * lens.fLength))
    .reduce(sum);
};
