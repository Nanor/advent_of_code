import { Input } from "../input";
import { Coord, Coord3, isDefined } from "../utils";

type Hail = {
  pos: Coord;
  vel: Coord;
};

type Hail3 = {
  pos: Coord3;
  vel: Coord3;
};

const parse = (input: Input): Hail3[] =>
  input.asLines().map((l) => {
    const [px, py, pz, vx, vy, vz] = l
      .match(
        /^(-?\d+),\s+(-?\d+),\s+(-?\d+)\s+@\s+(-?\d+),\s+(-?\d+),\s+(-?\d+)$/
      )!
      .slice(1)
      .map((d) => parseInt(d));

    return { pos: { x: px, y: py, z: pz }, vel: { x: vx, y: vy, z: vz } };
  });

const intersection2 = (
  { pos: P, vel: r }: Hail,
  { pos: Q, vel: s }: Hail
): Coord | undefined => {
  const den = r.x * s.y - r.y * s.x;

  const t = ((Q.x - P.x) * s.y - (Q.y - P.y) * s.x) / den;
  const u = ((Q.x - P.x) * r.y - (Q.y - P.y) * r.x) / den;

  if (t < 0 || u < 0) return;

  return {
    x: Math.round(P.x + t * r.x),
    y: Math.round(P.y + t * r.y),
  };
};

export const part1 = (
  input: Input,
  { min, max } = {
    min: 200000000000000,
    max: 400000000000000,
  }
) => {
  const hail = parse(input);

  return hail
    .flatMap((h1, i) =>
      hail.map((h2, j) => (i < j ? intersection2(h1, h2) : undefined))
    )
    .filter(isDefined)
    .filter((c) => c.x >= min && c.x <= max && c.y >= min && c.y <= max).length;
};

export const part2 = (input: Input) => {
  const hails = parse(input);

  const range = 300;

  for (let vX = -range; vX < range; vX++) {
    for (let vY = -range; vY < range; vY++) {
      const hails2 = hails.map(({ pos, vel }) => ({
        pos,
        vel: { x: vel.x - vX, y: vel.y - vY },
      }));

      let intersect: Coord;

      for (let i = 0; i < hails2.length; i++) {
        for (let j = 0; j < i; j++) {
          const int = intersection2(hails2[i], hails2[j]);

          if (int) {
            intersect = int;
            break;
          }
        }
        if (typeof intersect! !== "undefined") break;
      }

      if (typeof intersect! === "undefined") continue;

      let valid = true;
      const times = hails2.map((h) => {
        const timeX = (intersect.x - h.pos.x) / h.vel.x;
        const timeY = (intersect.y - h.pos.y) / h.vel.y;

        return Math.min(h.vel.x ? timeX : Infinity, h.vel.y ? timeY : Infinity);
      });

      const vZ =
        (hails[0].pos.z +
          hails[0].vel.z * times[0] -
          (hails[1].pos.z + hails[1].vel.z * times[1])) /
        (times[0] - times[1]);

      const sX = hails[0].pos.x + hails[0].vel.x * times[0] - vX * times[0];
      const sY = hails[0].pos.y + hails[0].vel.y * times[0] - vY * times[0];
      const sZ = hails[0].pos.z + hails[0].vel.z * times[0] - vZ * times[0];

      const shot = {
        pos: { x: sX, y: sY, z: sZ },
        vel: { x: vX, y: vY, z: vZ },
      };

      if (
        hails.every((h, i) => {
          const t = times[i];
          return (
            shot.pos.x + shot.vel.x * t === h.pos.x + h.vel.x * t &&
            shot.pos.y + shot.vel.y * t === h.pos.y + h.vel.y * t &&
            shot.pos.z + shot.vel.z * t === h.pos.z + h.vel.z * t
          );
        })
      ) {
        return shot.pos.x + shot.pos.y + shot.pos.z;
      }
    }
  }
};
