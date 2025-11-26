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
    print(part1(34000000))
    print(part2(34000000))


if __name__ == "__main__":
    main()
