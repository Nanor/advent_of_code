#!/usr/local/bin/python3
import re
from collections import defaultdict


def part1(instructions):
    lights = defaultdict(lambda: False)

    for (inst, x1, y1, x2, y2) in instructions:
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                if inst == 'turn on':
                    lights[(x, y)] = True
                elif inst == 'turn off':
                    lights[(x, y)] = False
                elif inst == 'toggle':
                    lights[(x, y)] = not lights[(x, y)]

    return len([l for l in lights.values() if l])


def part2(instructions):
    lights = defaultdict(lambda: 0)

    for (inst, x1, y1, x2, y2) in instructions:
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                if inst == 'turn on':
                    lights[(x, y)] += 1
                elif inst == 'turn off':
                    lights[(x, y)] = max(0, lights[(x, y)] - 1)
                elif inst == 'toggle':
                    lights[(x, y)] += 2

    return sum(lights.values())


def parse(line):
    m = re.search(
        r'(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)', line)
    (inst, x1, y1, x2, y2) = m.groups()

    return inst, int(x1), int(y1), int(x2), int(y2)


def main():
    with open('day6.txt') as f:
        instructions = [parse(line) for line in f]

    print(part1(instructions))
    print(part2(instructions))


if __name__ == '__main__':
    main()
