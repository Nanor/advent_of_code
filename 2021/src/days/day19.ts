import { Input } from "../input";

type Point = { x: number; y: number; z: number };

type Scanner = {
  id: number;
  beacons: Point[];
  located: boolean;
  checked: number[];
  location?: Point;
  dists: number[];
};

const eq = (a: Point, b: Point): boolean =>
  a.x === b.x && a.y === b.y && a.z === b.z;

const add = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
  z: a.z + b.z,
});

const sub = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z,
});

const dist = (a: Point, b: Point): number => {
  const diff = sub(a, b);
  return Object.values(diff).reduce((x, v) => x + Math.abs(v), 0);
};

const ROTATIONS = [
  ["x", "y", "z"],
  ["x", "-y", "-z"],
  ["x", "z", "-y"],
  ["x", "-z", "y"],
  ["-x", "y", "-z"],
  ["-x", "-y", "z"],
  ["-x", "z", "y"],
  ["-x", "-z", "-y"],
  ["y", "x", "-z"],
  ["y", "-x", "z"],
  ["y", "z", "x"],
  ["y", "-z", "-x"],
  ["-y", "x", "z"],
  ["-y", "-x", "-z"],
  ["-y", "z", "-x"],
  ["-y", "-z", "x"],
  ["z", "x", "y"],
  ["z", "-x", "-y"],
  ["z", "y", "-x"],
  ["z", "-y", "x"],
  ["-z", "x", "-y"],
  ["-z", "-x", "y"],
  ["-z", "y", "x"],
  ["-z", "-y", "-x"],
];

const rotate = (b: Point, r: string[]): Point => {
  return {
    x: b[r[0].match(/[xyz]/)[0]] * (r[0].match(/-/) ? -1 : 1),
    y: b[r[1].match(/[xyz]/)[0]] * (r[1].match(/-/) ? -1 : 1),
    z: b[r[2].match(/[xyz]/)[0]] * (r[2].match(/-/) ? -1 : 1),
  };
};

const locate = (scanner1: Scanner, scanner2: Scanner): boolean => {
  if (!scanner1.located) throw new Error("Scanner 1 not located");
  if (scanner2.located) throw new Error("Scanner 2 already located");
  if (scanner2.checked.includes(scanner1.id))
    throw new Error("Already tried this");

  const beaconOverlap = scanner1.dists.filter((d) =>
    scanner2.dists.includes(d)
  ).length;

  if (beaconOverlap < 132) {
    scanner2.checked.push(scanner1.id);
    return;
  }

  const bs1 = scanner1.beacons;

  for (let i = 0; i < bs1.length; i++) {
    for (let j = 0; j < scanner2.beacons.length; j++) {
      for (const r of ROTATIONS) {
        const offset = sub(bs1[i], rotate(scanner2.beacons[j], r));

        const bs2 = scanner2.beacons.map((b) => add(rotate(b, r), offset));

        let overlap = 0;

        for (let i = 0; i < bs1.length; i++) {
          for (let j = 0; j < bs2.length; j++) {
            if (eq(bs1[i], bs2[j])) {
              overlap += 1;
              break;
            }
          }
        }

        if (overlap >= 12) {
          scanner2.beacons = bs2;
          scanner2.located = true;
          scanner2.location = offset;

          return true;
        }
      }
    }
  }

  scanner2.checked.push(scanner1.id);

  return false;
};

let scanners: Scanner[] = [];

export const part1 = (input: Input) => {
  scanners = input.asParagraphs().map((ls, i) => {
    const beacons = ls.slice(1).map((b) => {
      const [x, y, z] = b.split(",").map((d) => parseInt(d));
      return { x, y, z };
    });

    return {
      id: i,
      beacons,
      located: i === 0,
      checked: [],
      location: i === 0 ? { x: 0, y: 0, z: 0 } : undefined,
      dists: beacons
        .flatMap((b1) => beacons.map((b2) => dist(b1, b2)))
        .filter(Boolean),
    };
  });

  while (scanners.some((s) => !s.located)) {
    scanners
      .filter((s) => !s.located)
      .forEach((s2) => {
        for (const s1 of scanners.filter(
          (s) => s.located && !s2.checked.includes(s.id)
        )) {
          if (locate(s1, s2)) break;
        }
      });
  }

  const beacons: Point[] = [];

  scanners.forEach((s) =>
    s.beacons.forEach((b) => {
      if (!beacons.some((b2) => eq(b, b2))) beacons.push(b);
    })
  );

  return beacons.length;
};

export const part2 = (input: Input) => {
  let maxDist = 0;

  scanners.forEach((s1) =>
    scanners.forEach((s2) => {
      maxDist = Math.max(maxDist, dist(s1.location, s2.location));
    })
  );

  return maxDist;
};
