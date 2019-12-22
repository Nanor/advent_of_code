import { Input } from "./input";

const simplify = (input: Input, count: number) => {
  let a = 1;
  let b = 0;

  input.asLines().map(line => {
    const m = line.match(/(-?\d+)/);
    let n: number;
    if (m) {
      n = parseInt(m[1]);
    }

    if (line.match(/deal with increment (\d+)/)) {
      a = (a * n) % count;
      b = (b * n) % count;
    } else if (line.match(/deal into new stack/)) {
      a *= -1;
      b = (-b - 1) % count;
    } else if (line.match(/cut (-?\d+)/)) {
      b = (b - n) % count;
    }
  });

  return { a: mod(a, count), b: mod(b, count) };
};

export const shuffle = (input: Input, cardCount: number): number[] => {
  const cards = [];
  [...Array(cardCount)].forEach((_, i) => {
    cards[track(input, cardCount, i)] = i;
  });
  return cards;
};

export const track = (input: Input, cardCount: number, cardToTrack: number) => {
  const { a, b } = simplify(input, cardCount);
  return mod(a * cardToTrack + b, cardCount);
};

export const part1 = (input: Input) => track(input, 10007, 2019);

const simplifyInv = (input: Input, count: number) => {
  let a = 1;
  let b = 0;

  input
    .asLines()
    .reverse()
    .map(line => {
      const m = line.match(/(-?\d+)/);
      let n: number;
      if (m) {
        n = parseInt(m[1]);
      }

      if (line.match(/deal with increment (\d+)/)) {
        a = divMod(a, n, count);
        b = divMod(b, n, count);
      } else if (line.match(/deal into new stack/)) {
        a *= -1;
        b = (-b - 1) % count;
      } else if (line.match(/cut (-?\d+)/)) {
        b = (b + n) % count;
      }
    });

  return { a: mod(a, count), b: mod(b, count) };
};

function gcdExtended(a: number, b: number) {
  let x = 0,
    y = 1,
    u = 1,
    v = 0;
  while (a !== 0) {
    let q = Math.floor(b / a);
    [x, y, u, v] = [u, v, x - u * q, y - v * q];
    [a, b] = [b % a, a];
  }
  return [b, x, y];
}

const mod = (a: number, b: number): number => {
  const x = a % b;
  return x < 0 ? x + b : x;
};

const modB = (a: bigint, b: number): number => {
  const x = a % BigInt(b);
  return Number(x < 0 ? x + BigInt(b) : x);
};

const powMod = (a: bigint, b: bigint, m: number): bigint => {
  if (b <= 1) {
    return BigInt(modB(a, m));
  }

  if (b % 2n) {
    return BigInt(modB(powMod(a, b - 1n, m) * a, m));
  } else {
    return BigInt(modB(powMod(a, b / 2n, m) ** 2n, m));
  }
};

const divMod = (a: number, b: number, m: number) => {
  return Number((BigInt(a) * BigInt(inv(b, m))) % BigInt(m));
};

function extendedGCD(a: number, b: number) {
  let [t, oldT] = [1, 0];
  let [r, oldR] = [b, a];

  while (oldR !== 0) {
    let quot = Math.floor(r / oldR);

    [oldT, t] = [t, oldT - quot * t];
    [oldR, r] = [r % oldR, oldR];
  }
  return oldT;
}

const inv = (a: number, count: number) => mod(extendedGCD(a, count), count);

export const part2 = (input: Input) => {
  const cardCount = 119315717514047;
  const loopCount = 101741582076661;

  const { a, b } = simplifyInv(input, cardCount);

  const allA = powMod(BigInt(a), BigInt(loopCount), cardCount);

  const allB = modB(
    BigInt(b) * (1n - allA) * BigInt(inv(mod(1 - a, cardCount), cardCount)),
    cardCount
  );

  return modB(2020n * BigInt(allA) + BigInt(allB), cardCount);
};
