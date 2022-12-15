import { Input } from "../input";

type Sensor = {
  x: number;
  y: number;
  beacon: Beacon;
  distance: number;
};

type Beacon = {
  x: number;
  y: number;
};

const dist = (
  a: { x: number; y: number },
  b: { x: number; y: number }
): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const parse = (input: Input) => {
  const sensors: Sensor[] = [];
  const beacons: Beacon[] = [];

  input
    .asLines()
    .filter(Boolean)
    .forEach((line) => {
      const [sx, sy, bx, by] = line
        .match(
          /Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/
        )
        .slice(1, 5)
        .map((n) => parseInt(n));

      const beacon = { x: bx, y: by };
      const sensor = {
        x: sx,
        y: sy,
        beacon,
        distance: dist({ x: sx, y: sy }, beacon),
      };

      sensors.push(sensor);
      beacons.push(beacon);
    });

  return { sensors, beacons };
};

export const part1 = (input: Input, y = 2000000) => {
  const { sensors, beacons } = parse(input);

  const minX = Math.min(...sensors.map((s) => s.x - s.distance));
  const maxX = Math.max(...sensors.map((s) => s.x + s.distance));

  let count = 0;

  for (let x = minX; x <= maxX; x++) {
    if (beacons.find((b) => b.x === x && b.y === y)) continue;

    const s = sensors.find((s) => dist({ x, y }, s) <= s.distance);
    if (s) {
      if (x < s.x) {
        const skip = 2 * (s.x - x);
        x += skip - 1;
        count += skip;
      } else {
        count += 1;
      }
    }
  }

  return count;
};

export const part2 = (input: Input, range = 4000000) => {
  const { sensors } = parse(input);

  let locs: Beacon[] = [];

  sensors.forEach((s1) => {
    sensors.forEach((s2) => {
      locs.push({
        x: Math.floor(s1.x + s2.x / 2),
        y: Math.floor(s1.y + s2.y / 2),
      });
    });
  });

  while (locs.length > 0) {
    let answer: Beacon | null = null;

    locs = locs
      .filter((l) => l.x >= 0 && l.x <= range && l.y >= 0 && l.y <= range)
      .map((l, j) => {
        const inRange = sensors.filter((s) => dist(s, l) <= s.distance);

        if (inRange.length === 0) {
          answer = l;
          return;
        }

        const closest = inRange.reduce((a, s) =>
          dist(l, s) < dist(l, a) ? s : a
        );

        return {
          x: l.x + Math.sign(l.x - closest.x),
          y: l.y + Math.sign(l.y - closest.y),
        };
      });

    if (answer) {
      return answer.x * 4000000 + answer.y;
    }
  }
};
