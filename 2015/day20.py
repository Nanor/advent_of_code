#!/usr/local/bin/python3
from math import ceil, sqrt
from typing import DefaultDict


def calc(house):
    presents = 0
    for j in range(1, ceil(sqrt(house)) + 1):
        if house % j == 0:
            presents += j
            if j != house // j:
                presents += house // j

    return presents


def part1(target: int):
    house = 1

    while True:
        v = calc(house)

        if v >= target // 10:
            return house

        if house % 100000 == 0:
            print(house)

        house += 1


def part2(target: int):
    elf = 1

    bound = None

    houses = DefaultDict(lambda: 0)

    while True:
        for n in range(1, 51):
            house = elf * n

            if bound and house > bound:
                break

            houses[house] += 11 * elf
            if houses[house] >= target:
                if bound is None:
                    bound = house
                else:
                    bound = min(bound, house)

        if houses[elf] >= target:
            return elf
        else:
            del houses[elf]

        elf += 1


def main():
    print(part1(34000000))
    print(part2(34000000))


if __name__ == '__main__':
    main()
