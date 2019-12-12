import { Input } from "./types";
const lcm = require("compute-lcm");

type Vec = { x: number; y: number; z: number };
type Moon = { pos: Vec; vel: Vec };

export const asMoons = (input: Input): Moon[] =>
  input
    .asLines()
    .map(l => l.match(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/).slice(1, 4))
    .map(([x, y, z]) => ({
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      z: parseInt(z, 10)
    }))
    .map(pos => ({ pos, vel: { x: 0, y: 0, z: 0 } }));

const step = (moons: Moon[]): Moon[] => {
  for (let i = 0; i < moons.length; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      const moon1 = moons[i];
      const moon2 = moons[j];

      ["x", "y", "z"].forEach(axis => {
        if (moon1.pos[axis] > moon2.pos[axis]) {
          moon1.vel[axis] -= 1;
          moon2.vel[axis] += 1;
        } else if (moon1.pos[axis] < moon2.pos[axis]) {
          moon1.vel[axis] += 1;
          moon2.vel[axis] -= 1;
        }
      });
    }
  }

  return moons.map(moon => {
    ["x", "y", "z"].forEach(axis => {
      moon.pos[axis] += moon.vel[axis];
    });

    return moon;
  });
};

const sum = (acc: number, x: number) => acc + x;

const energy = (moons: Moon[]): number =>
  moons
    .map(moon => {
      const pot = Object.values(moon.pos)
        .map(v => Math.abs(v))
        .reduce(sum, 0);
      const kin = Object.values(moon.vel)
        .map(v => Math.abs(v))
        .reduce(sum, 0);
      return pot * kin;
    })
    .reduce(sum, 0);

export const simulate = (moons: Moon[], steps: number) => {
  for (let n = 0; n < steps; n++) {
    moons = step(moons);
  }

  return energy(moons);
};

export const part1 = (input: Input) => {
  let moons = asMoons(input);

  return simulate(moons, 1000);
};

const hash = (moons: Moon[]): string => {
  const vals = [];
  moons.forEach(({ pos, vel }) => {
    vals.push([...Object.values(pos), ...Object.values(vel)]);
  });

  return vals.join(",");
};

const findLoop = (pos: number[]) => {
  const init = pos.join(",");
  const vel = pos.map(() => 0);

  let t = 0;
  while (true) {
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        if (pos[i] > pos[j]) {
          vel[i] -= 1;
          vel[j] += 1;
        } else if (pos[i] < pos[j]) {
          vel[i] += 1;
          vel[j] -= 1;
        }
      }
    }
    vel.forEach((v, i) => (pos[i] += v));

    t += 1;
    if (vel.every(x => x === 0)) {
      if (pos.join(",") === init) {
        return t;
      }
    }
  }
};

export const part2 = (input: Input) => {
  let moons = asMoons(input);

  const x = findLoop(moons.map(m => m.pos.x));
  const y = findLoop(moons.map(m => m.pos.y));
  const z = findLoop(moons.map(m => m.pos.z));

  return lcm(x, y, z);
};
