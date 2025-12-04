#!/usr/local/bin/python3
from collections import defaultdict
from operator import mul
from functools import reduce

qualities = {"capacity", "durability", "flavor", "texture"}


def partition(max, groups):
    if groups == 1:
        return [[max]]
    return [[i] + rest for i in range(max + 1) for rest in partition(max - i, groups - 1)]


def mix(ratios, ingredients):
    scores = defaultdict(int)
    for ratio, ingredient in zip(ratios, ingredients):
        for quality in ingredient.keys():
            scores[quality] += ratio * ingredient[quality]

    return scores


def score(scores):
    return reduce(mul, (max(0, scores[q]) for q in qualities), 1)


def part1(ingredients):
    return max(score(mix(parts, ingredients)) for parts in partition(100, len(ingredients)))


def part2(ingredients):
    scores = [mix(parts, ingredients) for parts in partition(100, len(ingredients))]
    return max(score(s) for s in scores if s["calories"] == 500)


def main():
    ingredients = []
    with open("../files/2015_15_input.txt") as fin:
        for line in fin:
            ingredients.append(
                {
                    name.strip(): int(value)
                    for (name, value) in (part.strip().split(" ") for part in line.split(":")[1].split(","))
                }
            )

    print(part1(ingredients))
    print(part2(ingredients))


if __name__ == "__main__":
    main()
