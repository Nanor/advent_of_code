#!/usr/local/bin/python3
from collections import defaultdict


def part1(instructions):
    registers = defaultdict(lambda: 0)
    pointer = 0
    sound = None

    def value(val):
        try:
            return int(val)
        except ValueError:
            return registers[val]

    while True:
        try:
            (op, x, y) = instructions[pointer]
        except ValueError:
            (op, x) = instructions[pointer]

        if op == 'snd':
            sound = value(x)
            pointer += 1
        elif op == 'set':
            registers[x] = value(y)
            pointer += 1
        elif op == 'add':
            registers[x] += value(y)
            pointer += 1
        elif op == 'mul':
            registers[x] *= value(y)
            pointer += 1
        elif op == 'mod':
            registers[x] = value(x) % value(y)
            pointer += 1
        elif op == 'rcv':
            if value(x) != 0:
                return sound
            pointer += 1
        elif op == 'jgz':
            if value(x) > 0:
                pointer += value(y)
            else:
                pointer += 1


def part2(instructions):
    def value(registers, val):
        try:
            return int(val)
        except ValueError:
            return registers[val]

    def program(index, instructions, my_queue, other_queue):
        registers = defaultdict(lambda: 0)
        registers['p'] = index
        pointer = 0
        count = 0

        while True:
            if pointer >= len(instructions):
                while True:
                    yield count

            try:
                (op, x, y) = instructions[pointer]
            except ValueError:
                (op, x) = instructions[pointer]

            if op == 'snd':
                other_queue.append(value(registers, x))
                pointer += 1
                count += 1
                yield
            elif op == 'set':
                registers[x] = value(registers, y)
                pointer += 1
                yield
            elif op == 'add':
                registers[x] += value(registers, y)
                pointer += 1
                yield
            elif op == 'mul':
                registers[x] *= value(registers, y)
                pointer += 1
                yield
            elif op == 'mod':
                registers[x] = value(registers, x) % value(registers, y)
                pointer += 1
                yield
            elif op == 'rcv':
                if len(my_queue) > 0:
                    registers[x] = my_queue.pop(0)
                    pointer += 1
                    yield
                else:
                    yield count
            elif op == 'jgz':
                if value(registers, x) > 0:
                    pointer += value(registers, y)
                    yield
                else:
                    pointer += 1
                    yield

    queue_0 = []
    queue_1 = []

    prog_0 = program(0, instructions, queue_0, queue_1)
    prog_1 = program(1, instructions, queue_1, queue_0)

    for x, y in zip(prog_0, prog_1):
        if x is not None and y is not None:
            return y

def main():
    with open('day18.txt') as f:
        instructions = [line.strip().split(' ') for line in f]

    print(part1(instructions))
    print(part2(instructions))

if __name__ == '__main__':
    main()
