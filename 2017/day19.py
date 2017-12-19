#!/usr/local/bin/python3
from string import ascii_uppercase


def next_dir(grid, pos, direction):
    if direction == 'd':
        next_pos = (pos[0], pos[1] + 1)
    elif direction == 'u':
        next_pos = (pos[0], pos[1] - 1)
    elif direction == 'l':
        next_pos = (pos[0] - 1, pos[1])
    elif direction == 'r':
        next_pos = (pos[0] + 1, pos[1])

    try:
        next_value = grid[next_pos[1]][next_pos[0]]
    except IndexError:
        next_value = None

    return next_pos, next_value


def traverse(grid):
    letters = []
    direction = 'd'
    pos = (grid[0].index('|'), 0)
    steps = 1

    while True:
        next_pos, next_value = next_dir(grid, pos, direction)

        if next_value is not None and next_value != ' ':
            if next_value in ascii_uppercase:
                letters.append(next_value)
            pos = next_pos
            steps += 1
        else:
            if direction in ['u', 'd']:
                directions = ['l', 'r']
            else:
                directions = ['u', 'd']

            nexts = [(d, next_dir(grid, pos, d)) for d in directions]
            try:
                direction = [d for (d, (_, v)) in nexts if v != ' '][0]
            except IndexError:
                return ''.join(letters), steps


def main():
    with open('day19.txt') as f:
        grid = [list(line)[:-1] for line in f]

    part1, part2 = traverse(grid)
    print(part1)
    print(part2)

if __name__ == '__main__':
    main()
