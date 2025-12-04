#!/usr/local/bin/python3
import numpy as np


def part1(target: int):
    houses = np.zeros((target // 30,))

    for i in range(2, target // 30):
        houses[i::i] += i

    return np.argmax(houses > target // 10)


def part2(target: int):
    houses = np.zeros((target // 30,))

    for i in range(2, target // 30):
        houses[i : i + i * 50 : i] += i

    return np.argmax(houses > target // 11)


def main():
    with open("../files/2015_20_input.txt") as fin:
        input = int(fin.read())

    print(part1(input))
    print(part2(input))


if __name__ == "__main__":
    main()
