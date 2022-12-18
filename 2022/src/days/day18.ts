import { Input } from "../input";

type Cube = { x: number; y: number; z: number };

const hash = ({ x, y, z }: Cube) => x + y * 100 + z * 10000;

const parse = (input: Input): Map<number, Cube> => {
  const map = new Map<number, Cube>();

  input
    .asLines()
    .filter(Boolean)
    .forEach((l) => {
      const [x, y, z] = l.split(",").map((n) => parseInt(n));
      map.set(hash({ x, y, z }), { x, y, z });
    });

  return map;
};

const neighbors = (d: Cube): Cube[] => [
  { ...d, x: d.x - 1 },
  { ...d, x: d.x + 1 },
  { ...d, y: d.y - 1 },
  { ...d, y: d.y + 1 },
  { ...d, z: d.z - 1 },
  { ...d, z: d.z + 1 },
];

export const part1 = (input: Input) => {
  const droplets = parse(input);

  return Array.from(droplets.values())
    .map((c) => neighbors(c).filter((n) => !droplets.has(hash(n))).length)
    .reduce((x, a) => x + a, 0);
};

export const part2 = (input: Input) => {
  const droplets = parse(input);

  const coords = Array.from(droplets.values()).flatMap(({ x, y, z }) => {
    return [x, y, z];
  });

  const min = Math.min(...coords) - 1;
  const max = Math.max(...coords) + 1;

  const toCheck: Cube[] = [{ x: 0, y: 0, z: 0 }];
  const steam = new Map<number, Cube>();

  while (toCheck.length > 0) {
    const next = toCheck.shift();

    if (steam.has(hash(next)) || droplets.has(hash(next))) continue;

    steam.set(hash(next), next);

    neighbors(next).forEach(({ x, y, z }) => {
      if (x >= min && x <= max && y >= min && y <= max && z >= min && z <= max)
        toCheck.push({ x, y, z });
    });
  }

  return Array.from(droplets.values())
    .map((d) => neighbors(d).filter((n) => steam.has(hash(n))).length)
    .reduce((x, a) => x + a, 0);
};
