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

def part2(instructions):
    registers = defaultdict(lambda: 0)
    registers['a'] = 1
    pointer = 0

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
        elif op == 'jnz':
            if value(x) != 0:
                pointer += value(y)
            else:
                pointer += 1
        print(registers['h'])

    return registers['h']

def main():
    with open('day23.txt') as f:
        instructions = [line.strip().split(' ') for line in f]

    print(part1(instructions))
    print(part2(instructions))

if __name__ == '__main__':
    main()
