#!/usr/local/bin/python3
from collections import defaultdict


def move(x, y):
    if -y <= -x <= y:
        x += 1
    elif -x >= -y >= x:
        y += 1
    elif -x < y <= x:
        y -= 1
    elif -y >= x >= y:
        x -= 1

    return x, y


def part1(input):
    x = 0
    y = 0

    for _ in range(input - 1):
        x, y = move(x, y)

    return abs(x) + abs(y)


def part2(input):
    x = 1
    y = 0
    board = defaultdict(lambda: 0)
    board[(0, 0)] = 1

    total = 0
    while total < input:
        neighbors = [(1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1), (0, 1), (1, 1)]
        total = sum(board[x + dx, y + dy] for (dx, dy) in neighbors)
        board[(x, y)] = total
        x, y = move(x, y)

    return total


def main():
    with open("../files/2017_03_input.txt") as f:
        input = int(f.read())
    print(part1(input))
    print(part2(input))


if __name__ == "__main__":
    main()
