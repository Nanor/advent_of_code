import { Input } from "../input";
import { product } from "../utils";

const solveRace = (time: number, distance: number) => {
  const i = Math.floor((time - Math.sqrt(time * time - 4 * distance)) / 2) + 1;
  return time - 2 * i + 1;
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
    .reduce(product);
};

export const part2 = (input: Input) => {
  const [time, distance] = input.asLines();

  const t = parseInt(time.replaceAll(" ", "").match(/\d+/)?.[0] || "");
  const d = parseInt(distance.replaceAll(" ", "").match(/\d+/)?.[0] || "");

  return solveRace(t, d);
};
