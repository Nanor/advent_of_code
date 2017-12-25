#!/usr/local/bin/python3
from collections import defaultdict


def get_group(connections, program):
    to_check = set()
    in_group = set()

    to_check.add(program)
    in_group.add(program)

    while to_check:
        current = to_check.pop()

        neighbours = connections[current]
        neighbours.difference_update(in_group)

        in_group.update(neighbours)
        to_check.update(neighbours)

    return frozenset(in_group)


def part2(connections):
    groups = set()
    to_check = set(connections)

    while to_check:
        group = get_group(connections, to_check.pop())
        to_check.difference_update(group)

        groups.add(group)

    return len(groups)


def main():
    connections = defaultdict(lambda: set())
    with open('day12.txt') as f:
        for line in f:
            program_1, programs = line.split('<->')

            for program_2 in programs.strip().split(','):
                connections[int(program_1)].add(int(program_2))
                connections[int(program_2)].add(int(program_1))

    # part1
    print(len(get_group(connections, 0)))

    print(part2(connections))


if __name__ == '__main__':
    main()
