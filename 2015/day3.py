#!/usr/local/bin/python3
from collections import defaultdict


def visit(directions):
    houses = defaultdict(lambda: 0)
    x = 0
    y = 0

    houses[(x, y)] += 1
    for direction in directions:
        if direction == "<":
            x -= 1
        elif direction == ">":
            x += 1
        elif direction == "^":
            y -= 1
        elif direction == "v":
            y += 1

        houses[(x, y)] += 1

    return houses


def part1(directions):
    return len(visit(directions))


def part2(directions):
    santa_houses = visit(directions[::2])
    robot_houses = visit(directions[1::2])

    return len(set(santa_houses.keys()).union(set(robot_houses.keys())))


def main():
    with open("../files/2015_03_input.txt") as f:
        directions = f.read().strip()

    print(part1(directions))
    print(part2(directions))


if __name__ == "__main__":
    main()
