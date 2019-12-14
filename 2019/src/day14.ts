import { Input } from "./input";

type Ingredient = {
  mol: string;
  count: number;
};
type Reaction = {
  input: Ingredient[];
  output: Ingredient;
};

const asIngredient = (str: string): Ingredient => {
  const [count, mol] = str.split(" ");
  return { count: parseInt(count, 10), mol };
};

const asReactions = (input: Input): Reaction[] =>
  input.asLines().map(l => {
    const [input, output] = l.split(" => ");
    return {
      input: input.split(", ").map(i => asIngredient(i)),
      output: asIngredient(output)
    };
  });

const produces = (
  { count, mol }: Ingredient,
  reactions: Reaction[]
): Ingredient[] => {
  const reaction = reactions.find(r => {
    return r.output.mol === mol;
  });

  const times = Math.ceil(count / reaction.output.count);

  return [
    ...reaction.input.map(({ mol, count }) => ({ mol, count: count * times })),
    { mol, count: count - reaction.output.count * times }
  ];
};

const backProp = (fuelCount, reactions) => {
  let oreCount = 0;
  let targets = { FUEL: fuelCount };

  while (
    Object.values(targets)
      .map(x => Math.max(x, 0))
      .reduce((a, x) => a + x)
  ) {
    const [[targetMol, targetCount]] = Object.entries(targets).filter(
      ([_m, c]) => c > 0
    );
    delete targets[targetMol];

    const requires = produces(
      { mol: targetMol, count: targetCount },
      reactions
    );
    requires.forEach(({ mol, count }) => {
      if (mol === "ORE") {
        oreCount += count;
      } else if (mol in targets) {
        targets[mol] += count;
      } else {
        targets[mol] = count;
      }
    });
  }

  return oreCount;
};

export const part1 = (input: Input) => {
  return backProp(1, asReactions(input));
};

export const part2 = (input: Input) => {
  const tril = 1000000000000;
  const reactions = asReactions(input);

  let minGuess = tril / backProp(1, reactions);
  let maxGuess = minGuess * 100;

  while (minGuess < maxGuess - 1) {
    const newGuess = Math.floor((minGuess + maxGuess) / 2);

    const oreNeeded = backProp(newGuess, reactions);

    if (oreNeeded > tril) {
      maxGuess = newGuess;
    }
    if (oreNeeded < tril) {
      minGuess = newGuess;
    }
  }

  return minGuess;
};
