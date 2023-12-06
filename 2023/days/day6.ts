import { Input } from "../input";

const solveRace = (time: number, distance: number) => {
  let minI = 0;
  let maxI = time / 2;

  while (minI < maxI - 1) {
    const newI = Math.floor((minI + maxI) / 2);

    if (newI * (time - newI) > distance) {
      maxI = newI;
    } else {
      minI = newI;
    }
  }

  return time - 2 * maxI + 1;
};

export const part1 = (input: Input) => {
  const [time, distance] = input.asLines();

  const [_1, ...times] = time.split(/\s+/);
  const [_2, ...distances] = distance.split(/\s+/);

  const races = times.map((time, i) => ({
    time: parseInt(time),
    distance: parseInt(distances[i]),
  }));

  return races
    .map((race) => solveRace(race.time, race.distance))
    .reduceRight((x, y) => x * y);
};

export const part2 = (input: Input) => {
  const [time, distance] = input.asLines();

  const t = parseInt(time.replaceAll(" ", "").match(/\d+/)?.[0] || "");
  const d = parseInt(distance.replaceAll(" ", "").match(/\d+/)?.[0] || "");

  return solveRace(t, d);
};
