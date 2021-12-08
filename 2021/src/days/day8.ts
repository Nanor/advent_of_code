import { Input } from "../input";

export const part1 = (input: Input) => {
  const outputs = input.asLines().flatMap((l) => l.split(" | ")[1].split(" "));

  return outputs.filter((o) => [2, 3, 4, 7].includes(o.length)).length;
};

const LETTERS = "abcdefg".split("");
const NUMBERS = Object.fromEntries(
  Object.entries(
    [
      "abcefg",
      "cf",
      "acdeg",
      "acdfg",
      "bcdf",
      "abdfg",
      "abdefg",
      "acf",
      "abcdefg",
      "abcdfg",
    ].map((ls) => ls.split(""))
  )
);

const all_connections = (
  options: { [x: string]: string[] },
  connections: { [x: string]: string } = {}
): { [x: string]: string }[] => {
  for (const letter of LETTERS) {
    if (!(letter in connections)) {
      return options[letter]
        .filter((l) => !Object.values(connections).includes(l))
        .flatMap((l) =>
          all_connections(options, { ...connections, [letter]: l })
        );
    }
  }

  return [connections];
};

export const solve = (inputs: string[]) => {
  const options = Object.fromEntries(LETTERS.map((l) => [l, LETTERS]));

  inputs.forEach((input: string) => {
    const guesses = Object.entries(NUMBERS)
      .filter(([n, xs]) => xs.length === input.length)
      .map(([k, v]) => k);

    const guessOutputs = guesses.flatMap((n) => NUMBERS[n]);

    input.split("").forEach((l) => {
      options[l] = options[l].filter((o) => guessOutputs.includes(o));
    });
  });

  for (const connection of all_connections(options)) {
    const output = inputs.map((input) => {
      const o = Object.entries(NUMBERS).find(
        ([k, n]) =>
          input
            .split("")
            .map((i) => connection[i])
            .sort()
            .join("") === n.join("")
      );
      return o ? o[0] : undefined;
    });

    if (output.every((o) => o !== undefined)) {
      return parseInt(output.slice(output.length - 4).join(""));
    }
  }
};

export const part2 = (input: Input) => {
  const inputs = input.asLines().map((l) => l.replace("| ", "").split(" "));
  const numbers = inputs.map(solve);

  return numbers.reduce((x, y) => x + y);
};
