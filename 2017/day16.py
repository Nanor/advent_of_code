#!/usr/local/bin/python3
import re
from string import ascii_lowercase


def dance(perfomers, steps):
    for move, arg1, arg2 in steps:
        if move == 's':
            pos = int(arg1)
            perfomers = perfomers[-pos:] + perfomers[:-pos]
        elif move == 'x':
            pos1 = int(arg1)
            pos2 = int(arg2)
            perfomers[pos1], perfomers[pos2] = perfomers[pos2], perfomers[pos1]
        elif move == 'p':
            pos1 = perfomers.index(arg1)
            pos2 = perfomers.index(arg2)
            perfomers[pos1], perfomers[pos2] = perfomers[pos2], perfomers[pos1]

    return perfomers


def part1(steps):
    return ''.join(dance(list(ascii_lowercase[:16]), steps))


def part2(steps):
    perfomers = list(ascii_lowercase[:16])
    history = [ascii_lowercase[:16]]

    for _ in range(10 ** 9):
        perfomers = dance(perfomers, steps)
        str_performers = ''.join(perfomers)

        if str_performers in history:
            loop_start_index = history.index(str_performers)
            loop_length = (len(history) - loop_start_index)
            end_index = ((10 ** 9) - loop_start_index) % loop_length + loop_start_index
            return history[end_index]

        history.append(str_performers)

    return str_performers


def main():
    with open('day16.txt') as file:
        string = file.read()
        exp = re.compile(r'(s|x|p)([^/]+)/?(\S+)?')
        steps = [exp.search(step).groups() for step in string.split(',')]

    print(part1(steps))
    print(part2(steps))


if __name__ == '__main__':
    main()
