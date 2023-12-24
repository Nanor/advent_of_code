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

      let intersect: Coord | undefined = undefined;

      for (let i = 0; i < hails2.length; i++) {
        for (let j = 0; j < i; j++) {
          intersect = intersection2(hails2[i], hails2[j]);

          if (intersect) break;
        }
        if (intersect) break;
      }

      if (!intersect) continue;

      const velZs: { z: number; t: number }[] = [];

      let sX = NaN;
      let sY = NaN;

      for (let i = 0; i < hails.length; i++) {
        let time = NaN;
        const t1 = (intersect.x - hails2[i].pos.x) / hails2[i].vel.x;

        if (isNaN(t1)) {
          const t2 = (intersect.y - hails2[i].pos.y) / hails2[i].vel.y;
          if (!isNaN(t2)) {
            time = t2;
          }
        } else {
          time = t1;
        }
        if (isNaN(time)) continue;

        const cX = hails[i].pos.x + hails[i].vel.x * time;
        const cY = hails[i].pos.y + hails[i].vel.y * time;

        sX = cX - vX * time;
        sY = cY - vY * time;

        velZs.push({ z: hails[i].pos.z + hails[i].vel.z * time, t: time });
      }

      if (velZs.length === 0) continue;

      const vZ = (velZs[0].z - velZs[1].z) / (velZs[0].t - velZs[1].t);
      const cZ = hails[0].pos.z + hails[0].vel.z * velZs[0].t;
      const sZ = cZ - vZ * velZs[0].t;

      const shot = {
        pos: { x: sX, y: sY, z: sZ },
        vel: { x: vX, y: vY, z: vZ },
      };

      if (
        hails.every((h) => {
          const p = intersection2(h, shot);
          if (!p) return false;
          const t = (p.x - shot.pos.x) / shot.vel.x;

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
