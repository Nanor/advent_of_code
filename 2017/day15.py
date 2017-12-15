#!/usr/local/bin/python3
import re


def judge(a_gen, b_gen, length):
    total = 0

    for i, a, b in zip(range(length), a_gen, b_gen):
        if (a % (2 << 15)) == (b % (2 << 15)):
            total += 1

    return total


def part1(a_start, b_start):
    def gen(factor, divisor, start):
        curr = start

        while True:
            curr = (curr * factor) % divisor
            yield curr

    a_gen = gen(16807, 2147483647, a_start)
    b_gen = gen(48271, 2147483647, b_start)

    return judge(a_gen, b_gen, 4 * (10 ** 7))


def part2(a_start, b_start):
    def gen(factor, divisor, start, multiples):
        curr = start

        while True:
            curr = (curr * factor) % divisor
            if curr % multiples == 0:
                yield curr

    a_gen = gen(16807, 2147483647, a_start, 4)
    b_gen = gen(48271, 2147483647, b_start, 8)

    return judge(a_gen, b_gen, 5 * (10 ** 6))


def main():
    with open('day15.txt') as f:
        (a_start, b_start) = [
            int(re.search(r'(\d+)', line).group(0)) for line in f]

    print(part1(a_start, b_start))
    print(part2(a_start, b_start))


if __name__ == '__main__':
    main()
