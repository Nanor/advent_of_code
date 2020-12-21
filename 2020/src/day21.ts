import { Input } from "./input";

type Food = {
  allergens: string[];
  ingredients: string[];
};

const parse = (input: Input) => {
  const allAllergens: Set<string> = new Set();
  const allIngredients: Set<string> = new Set();

  const foods: Food[] = input.asLines().map((line) => {
    const [ing, all] = line.split(" (");

    const ingredients = ing.split(" ");
    const allergens = all.replace("contains ", "").replace(")", "").split(", ");

    allergens.forEach((a) => allAllergens.add(a));
    ingredients.forEach((i) => allIngredients.add(i));

    return { ingredients, allergens };
  });

  const possibles: Set<string> = new Set();
  const allergenMap = {};

  allAllergens.forEach((allergen) => {
    const ings = foods
      .filter(({ allergens }) => allergens.includes(allergen))
      .map(({ ingredients }) => ingredients);

    const common = ings.reduce((acc, x) => acc.filter((y) => x.includes(y)));
    allergenMap[allergen] = common;

    common.forEach((c) => possibles.add(c));
  });

  return { foods, possibles, allergenMap };
};

export const part1 = (input: Input) => {
  const { foods, possibles } = parse(input);

  return foods.reduce(
    (acc, { ingredients }) =>
      acc + ingredients.filter((i) => !possibles.has(i)).length,
    0
  );
};

export const part2 = (input: Input) => {
  const { allergenMap } = parse(input);

  const allergens = [];

  while (Object.keys(allergenMap).length > 0) {
    Object.keys(allergenMap).forEach((allergen) => {
      const ings = allergenMap[allergen];
      if (ings.length === 1) {
        allergens.push([allergen, ings[0]]);

        delete allergenMap[allergen];
        Object.keys(allergenMap).forEach((a2) => {
          allergenMap[a2] = allergenMap[a2].filter((i) => i !== ings[0]);
        });
      }
    });
  }
  allergens.sort((a, b) => a[0].localeCompare(b[0]));

  return allergens.map((x) => x[1]).join(",");
};
