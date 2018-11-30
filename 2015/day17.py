#!/usr/local/bin/python3
from itertools import combinations


def part1(containers):
    return len(
        [
            o
            for i in range(1, len(containers))
            for o in combinations(containers, i)
            if sum(o) == 150
        ]
    )


def part2(containers):
    for i in range(1, len(containers)):
        options = [o for o in combinations(containers, i) if sum(o) == 150]
        if options:
            return len(options)


def main():
    with open("day17.txt") as fin:
        containers = [int(c) for c in fin]

    print(part1(containers))
    print(part2(containers))


if __name__ == "__main__":
    main()
