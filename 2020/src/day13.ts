import { Input } from "./input";

export const part1 = (input: Input) => {
  const [startString, busList] = input.asLines();

  const start = parseInt(startString);
  const buses = busList
    .split(",")
    .filter((x) => x !== "x")
    .map((x) => parseInt(x));

  const [nextBus] = buses
    .map((id) => {
      return { id, next: start + id - (start % id) };
    })
    .sort((a, b) => a.next - b.next);

  return (nextBus.next - start) * nextBus.id;
};

type Bus = {
  id: number;
  offset: number;
};

const parseOffsets = (buses: string[]): Bus[] =>
  buses
    .map((b, i) => (b !== "x" ? { id: parseInt(b), offset: i } : undefined))
    .filter((x) => x);

const findTimestamp = (buses: Bus[]): number => {
  let t = 0;

  while (true) {
    const matches = buses.filter(({ id, offset }) => (t + offset) % id === 0);

    if (matches.length === buses.length) {
      return t;
    }

    t += matches.map(({ id }) => id).reduce((x, y) => x * y, 1);
  }
};

export const part2 = (input: Input) => {
  const ids = input.asLines()[1].split(",");
  const buses = parseOffsets(ids);

  return findTimestamp(buses);
};
