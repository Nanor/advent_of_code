#!$HOME/.pyenv/shims/python3
from enum import Enum
import re
import numpy as np


class Inst(Enum):
    ON = "turn on"
    OFF = "turn off"
    TOGGLE = "toggle"


def part1(instructions):
    lights = np.zeros((1000, 1000))

    for inst, x1, y1, x2, y2 in instructions:
        if inst == Inst.ON:
            lights[x1 : x2 + 1, y1 : y2 + 1] = 1
        elif inst == Inst.OFF:
            lights[x1 : x2 + 1, y1 : y2 + 1] = 0
        elif inst == Inst.TOGGLE:
            lights[x1 : x2 + 1, y1 : y2 + 1] = 1 - lights[x1 : x2 + 1, y1 : y2 + 1]

    return int(np.sum(lights))


def part2(instructions):
    lights = np.zeros((1000, 1000))

    for inst, x1, y1, x2, y2 in instructions:
        if inst == Inst.ON:
            lights[x1 : x2 + 1, y1 : y2 + 1] += 1
        elif inst == Inst.OFF:
            lights[x1 : x2 + 1, y1 : y2 + 1] = np.maximum(0, lights[x1 : x2 + 1, y1 : y2 + 1] - 1)
        elif inst == Inst.TOGGLE:
            lights[x1 : x2 + 1, y1 : y2 + 1] += 2

    return int(np.sum(lights))


def parse(line):
    m = re.search(r"(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)", line)
    (inst, x1, y1, x2, y2) = m.groups()

    return Inst(inst), int(x1), int(y1), int(x2), int(y2)


def main():
    with open("../files/2015_06_input.txt") as f:
        instructions = [parse(line) for line in f]

    print(part1(instructions))
    print(part2(instructions))


if __name__ == "__main__":
    main()
