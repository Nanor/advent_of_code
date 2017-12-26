#!/usr/local/bin/python3
from collections import defaultdict


def part1(instructions):
    registers = defaultdict(lambda: 0)
    pointer = 0
    mul_count = 0

    def value(val):
        try:
            return int(val)
        except ValueError:
            return registers[val]

    while pointer < len(instructions):
        (op, x, y) = instructions[pointer]

        if op == 'set':
            registers[x] = value(y)
            pointer += 1
        elif op == 'sub':
            registers[x] -= value(y)
            pointer += 1
        elif op == 'mul':
            registers[x] *= value(y)
            pointer += 1
            mul_count += 1
        elif op == 'jnz':
            if value(x) != 0:
                pointer += value(y)
            else:
                pointer += 1

    return mul_count


def is_prime(n):
    if n < 2:
        return False
    for x in range(2, int(n**0.5) + 1):
        if n % x == 0:
            return False
    return True


def part2():
    h = 0
    for b in range(106700, 123701, 17):
        if not is_prime(b):
            h += 1
    return h


def main():
    with open('day23.txt') as f:
        instructions = [line.strip().split(' ') for line in f]

    print(part1(instructions))
    print(part2())

if __name__ == '__main__':
    main()
