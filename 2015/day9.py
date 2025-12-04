#!/usr/local/bin/python3
import re
from itertools import combinations


def part1(distances, places, current=None):
    if current is None:
        return min(part1(distances, places.difference([place]), current=place) for place in places)

    if len(places) == 0:
        return 0

    return min(
        distances[(current, place)] + part1(distances, places.difference([place]), current=place)
        for place in places
        if place != current
    )


def part2(distances, places, current=None):
    if current is None:
        return max(part2(distances, places.difference([place]), current=place) for place in places)

    if len(places) == 0:
        return 0

    return max(
        distances[(current, place)] + part2(distances, places.difference([place]), current=place)
        for place in places
        if place != current
    )


def main():
    distances = {}
    places = set()
    with open("../files/2015_09_input.txt") as f:
        for line in f:
            m = re.search(r"(\w+) to (\w+) = (\d+)", line)
            (x, y, d) = m.groups()
            distances[(x, y)] = distances[(y, x)] = int(d)
            places = places.union([x, y])

    print(part1(distances, places))
    print(part2(distances, places))


if __name__ == "__main__":
    main()
