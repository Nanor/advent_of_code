import { resourceUsage } from "process";
import { IfStatement } from "typescript";
import { Input } from "../input";

type Inst = {
  state: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  z1: number;
  z2: number;
};

const parse = (input: Input): Inst[] => {
  return input.asLines().map((l) => {
    const m = l.match(
      /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
    );
    const state = m[1] === "on";
    const [x1, x2, y1, y2, z1, z2] = m.slice(2).map((d) => parseInt(d, 10));
    return { state, x1, x2, y1, y2, z1, z2 };
  });
};

const overlaps = (a: Inst, b: Inst) =>
  !(
    b.x1 > a.x2 ||
    b.x2 < a.x1 ||
    b.y1 > a.y2 ||
    b.y2 < a.y1 ||
    b.z1 > a.z2 ||
    b.z2 < a.z1
  );

const area = (a: Inst): number =>
  (a.x2 - a.x1 + 1) * (a.y2 - a.y1 + 1) * (a.z2 - a.z1 + 1);

const split = (a: Inst, b: Inst) => {
  const splitPart = (o: Inst, axis: "x" | "y" | "z", v: number): Inst[] => {
    if (overlaps(o, b) && o[`${axis}1`] < v && o[`${axis}2`] > v) {
      return [
        {
          ...o,
          [`${axis}2`]: Math.floor(v),
        },
        {
          ...o,
          [`${axis}1`]: Math.ceil(v),
        },
      ];
    } else {
      return [o];
    }
  };

  let out = [a];
  out = out.flatMap((o) => splitPart(o, "x", b.x1 - 0.5));
  out = out.flatMap((o) => splitPart(o, "x", b.x2 + 0.5));
  out = out.flatMap((o) => splitPart(o, "y", b.y1 - 0.5));
  out = out.flatMap((o) => splitPart(o, "y", b.y2 + 0.5));
  out = out.flatMap((o) => splitPart(o, "z", b.z1 - 0.5));
  out = out.flatMap((o) => splitPart(o, "z", b.z2 + 0.5));

  return out;
};

const calc = (insts: Inst[]): number => {
  let count = 0;

  let newInsts: Inst[] = [];

  insts.forEach((i) => {
    const ovs = newInsts.filter((j) => overlaps(i, j));

    let boxes = [i];
    if (ovs.length) {
      if (i.state) {
        ovs.forEach((j) => {
          boxes = boxes.flatMap((b) => split(b, j));
        });

        boxes = boxes.filter((b) => {
          return !ovs.some((j) => overlaps(j, b));
        });

        boxes.forEach((b) => (count += area(b)));
        newInsts.push(...boxes);
      } else {
        newInsts = newInsts.filter((j) => !overlaps(j, i));

        ovs.forEach((j) => {
          let js = split(j, i);

          js.forEach((k) => {
            if (overlaps(k, i)) {
              count -= area(k);
            }
          });

          newInsts.push(...js.filter((k) => !overlaps(k, i)));
        });
      }
    } else if (i.state) {
      newInsts.push(i);
      count += area(i);
    }
  });

  return count;
};

export const part1 = (input: Input) => {
  const insts: Inst[] = parse(input);

  return calc(
    insts.filter((i) =>
      [i.x1, i.x2, i.y1, i.y2, i.z1, i.z2].every((v) => Math.abs(v) <= 50)
    )
  );
};

export const part2 = (input: Input) => {
  const insts: Inst[] = parse(input);

  return calc(insts);
};
