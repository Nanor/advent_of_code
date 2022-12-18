import HashSet from "../common/HashSet";

class Cubes extends HashSet<Vec3, number> {
  hash({ x, y, z }) {
    return x + y * 100 + z * 10000;
  }
}

const parse = (input: Input) =>
  new Cubes(input.asNumberArrays().map(([x, y, z]) => ({ x, y, z })));

const neighbors = (d: Vec3): Vec3[] => [
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
    .map((c) => neighbors(c).filter((n) => !droplets.has(n)).length)
    .reduce((x, a) => x + a, 0);
};

export const part2 = (input: Input) => {
  const droplets = parse(input);

  const coords = Array.from(droplets.values()).flatMap(({ x, y, z }) => {
    return [x, y, z];
  });

  const min = Math.min(...coords) - 1;
  const max = Math.max(...coords) + 1;

  const toCheck: Vec3[] = [{ x: 0, y: 0, z: 0 }];
  const steam = new Cubes();

  while (toCheck.length > 0) {
    const next = toCheck.shift();

    if (steam.has(next) || droplets.has(next)) continue;

    steam.add(next);

    neighbors(next).forEach(({ x, y, z }) => {
      if (x >= min && x <= max && y >= min && y <= max && z >= min && z <= max)
        toCheck.push({ x, y, z });
    });
  }

  return Array.from(droplets.values())
    .map((d) => neighbors(d).filter((n) => steam.has(n)).length)
    .reduce((x, a) => x + a, 0);
};
