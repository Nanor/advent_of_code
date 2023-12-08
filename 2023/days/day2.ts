import { Input } from "../input";
import { sum } from "../utils";

type Game = {
  id: number;
  hands: { red: number; green: number; blue: number }[];
};

const parse = (input: Input): Game[] =>
  input.asLines().map((line) => {
    const [id, hands] = line.split(": ");

    return {
      id: parseInt(id.split(" ")[1]),
      hands: hands.split("; ").map((hand) => ({
        red: 0,
        green: 0,
        blue: 0,
        ...Object.fromEntries(
          hand.split(", ").map((h) => {
            const [num, col] = h.split(" ");
            return [col.trim(), parseInt(num)];
          })
        ),
      })),
    };
  });

export const part1 = (input: Input) =>
  parse(input)
    .filter(
      (game) =>
        !game.hands.some(
          (hand) => hand.red > 12 || hand.green > 13 || hand.blue > 14
        )
    )
    .map((game) => game.id)
    .reduce(sum);

export const part2 = (input: Input) =>
  parse(input)
    .map((game) => {
      const minBag = game.hands.reduce(
        (bag, hand) => ({
          red: Math.max(bag.red, hand.red),
          green: Math.max(bag.green, hand.green),
          blue: Math.max(bag.blue, hand.blue),
        }),
        { red: 0, green: 0, blue: 0 }
      );

      return minBag.red * minBag.green * minBag.blue;
    })
    .reduce(sum);
