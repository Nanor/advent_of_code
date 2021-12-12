import { Input } from "../input";

const paths = (
  links: string[][],
  path = ["start"],
  visitTwice = false
): string[][] => {
  const lastCave = path[path.length - 1];

  return links
    .flatMap((l) => {
      if (l.includes(lastCave)) {
        const other = l.find((x) => x !== lastCave);

        if (other === "start") return;

        if (other === "end") {
          return [[...path, other]];
        }

        if (other.match(/[A-Z]+/) || !path.includes(other)) {
          return paths(links, [...path, other], visitTwice);
        }

        if (visitTwice) {
          return paths(links, [...path, other], false);
        }
      }
    })
    .filter(Boolean);
};

export const part1 = (input: Input) => {
  const links = input.asLines().map((l) => l.split("-"));

  const ps = paths(links);
  return ps.length;
};

export const part2 = (input: Input) => {
  const links = input.asLines().map((l) => l.split("-"));

  const ps = paths(links, ["start"], true);
  return ps.length;
};
