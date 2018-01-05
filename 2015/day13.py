#!/usr/local/bin/python3
from collections import defaultdict
import re
import itertools


def calculate(happiness, arangement):
    threes = [(arangement + arangement)[n - 1:n + 2]
              for n in range(len(arangement) - 1, len(arangement) * 2 - 1)]

    total = 0
    for left, middle, right in threes:
        total += happiness[middle][left] + happiness[middle][right]

    return total


def calc_max(happiness):
    people = list(happiness.keys())
    perms = [[people[0]] + list(p) for p in itertools.permutations(people[1:])]
    return max(calculate(happiness, p) for p in perms)


def main():
    happiness = defaultdict(lambda: {})

    with open('day13.txt') as file:
        exp = re.compile(
            r'(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).')
        for line in file:
            m = exp.match(line)
            person_1, direction, amount, person_2 = m.groups()
            happiness[person_1][person_2] = int(
                amount) if direction == 'gain' else -int(amount)

    # Part 1
    print(calc_max(happiness))

    # Part 2
    for person in list(happiness.keys()):
        happiness['Me'][person] = 0
        happiness[person]['Me'] = 0

    print(calc_max(happiness))

if __name__ == '__main__':
    main()
