import { Input } from "./input";

type Hex = {
  r: number;
  s: number;
  q: number;
};

type Dir = "ne" | "nw" | "se" | "sw" | "e" | "w";

class State {
  set: Set<string>;

  constructor() {
    this.set = new Set<string>();
  }

  get(hex: Hex) {
    return this.set.has(JSON.stringify(hex));
  }

  flip(hex: Hex) {
    if (this.get(hex)) {
      this.set.delete(JSON.stringify(hex));
    } else {
      this.set.add(JSON.stringify(hex));
    }
  }

  add(hex: Hex) {
    this.set.add(JSON.stringify(hex));
  }

  values() {
    const out = [];
    this.set.forEach((v) => out.push(JSON.parse(v)));
    return out;
  }

  size() {
    return this.set.size;
  }
}

const getDir = (dir: Dir): Hex =>
  ({
    ne: { r: 0, s: 1, q: -1 },
    nw: { r: 1, s: 0, q: -1 },
    se: { r: -1, s: 0, q: 1 },
    sw: { r: 0, s: -1, q: 1 },
    e: { r: -1, s: 1, q: 0 },
    w: { r: 1, s: -1, q: 0 },
  }[dir]);

const move = (hex: Hex, dir: Dir): Hex => {
  const oth = getDir(dir);
  return {
    r: hex.r + oth.r,
    s: hex.s + oth.s,
    q: hex.q + oth.q,
  };
};

const eq = (hex: Hex, oth: Hex): boolean =>
  hex.r === oth.r && hex.s === oth.s && hex.q === oth.q;

export const split = (dirs: string): Dir[] =>
  dirs.match(/[ns]?[ew]/g).map((x) => x as Dir);

const getInitial = (input: Input): State => {
  const lines: Dir[][] = input.asLines().map(split);

  const flipped = lines.map((l) => {
    return l.reduce((hex: Hex, dir: Dir) => move(hex, dir), {
      r: 0,
      s: 0,
      q: 0,
    });
  });

  const state = new State();

  flipped.forEach((hex: Hex) => {
    state.flip(hex);
  });

  return state;
};

const dirs: Dir[] = ["ne", "nw", "se", "sw", "e", "w"];

const nearbys = (hex: Hex): Hex[] => {
  return dirs.map((dir) => move(hex, dir));
};

export const part1 = (input: Input) => getInitial(input).size();

export const part2 = (input: Input, days = 100) => {
  let state = getInitial(input);

  for (let i = 0; i < days; i++) {
    const toCheck = new State();
    state.values().forEach((v) => {
      nearbys(v).forEach((v2) => toCheck.add(v2));
    });

    const newState = new State();

    toCheck.values().forEach((v) => {
      const count = nearbys(v).filter((v2) => state.get(v2)).length;

      if (count === 2 || (count === 1 && state.get(v))) {
        newState.add(v);
      }
    });

    state = newState;
  }

  return state.size();
};
