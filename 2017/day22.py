#!/usr/local/bin/python3
from collections import defaultdict


def part1(grid):
    x = 0
    y = 0
    direction = 'u'
    directions = ['u', 'r', 'd', 'l']
    count = 0

    for _ in range(10000):
        if grid[(x, y)] == 'i':
            direction = directions[(directions.index(direction) + 1) % 4]
            grid[(x, y)] = 'c'
        else:
            direction = directions[(directions.index(direction) - 1) % 4]
            grid[(x, y)] = 'i'
            count += 1

        if direction == 'u':
            y -= 1
        elif direction == 'r':
            x += 1
        elif direction == 'd':
            y += 1
        elif direction == 'l':
            x -= 1

    return count


def part2(grid):
    x = 0
    y = 0
    direction = 'u'
    directions = ['u', 'r', 'd', 'l']
    count = 0

    for _ in range(10000000):
        if grid[(x, y)] == 'c':
            direction = directions[(directions.index(direction) - 1) % 4]
            grid[(x, y)] = 'w'
        elif grid[(x, y)] == 'w':
            grid[(x, y)] = 'i'
            count += 1
        elif grid[(x, y)] == 'i':
            direction = directions[(directions.index(direction) + 1) % 4]
            grid[(x, y)] = 'f'
        elif grid[(x, y)] == 'f':
            direction = directions[(directions.index(direction) + 2) % 4]
            grid[(x, y)] = 'c'

        if direction == 'u':
            y -= 1
        elif direction == 'r':
            x += 1
        elif direction == 'd':
            y += 1
        elif direction == 'l':
            x -= 1

    return count


def main():
    grid = defaultdict(lambda: 'c')
    with open('day22.txt') as f:
        start_grid = [list(l.strip()) for l in f]

    height = len(start_grid)
    width = len(start_grid[0])

    for y, row in enumerate(start_grid):
        for x, cell in enumerate(row):
            grid[(x - width // 2, y - height // 2)
                 ] = 'i' if cell == '#' else 'c'

    print(part1(grid.copy()))
    print(part2(grid.copy()))

if __name__ == '__main__':
    main()
