#!/usr/local/bin/python3
from day10 import hash


def make_grid(input):
    hashes = [bin(int(hash('{0}-{1}'.format(input, n)), base=16))
              for n in range(128)]
    padded = [hash[2:].zfill(128) for hash in hashes]

    return [[0 if c == '1' else None for c in line] for line in padded]


def part1(grid):
    return sum(line.count(0) for line in grid)


def part2(grid):
    def fill(grid, x, y, partition):
        if 0 <= x < 128 and 0 <= y < 128 and grid[y][x] == 0:
            grid[y][x] = partition
            grid = fill(grid, x + 1, y, partition)
            grid = fill(grid, x - 1, y, partition)
            grid = fill(grid, x, y + 1, partition)
            grid = fill(grid, x, y - 1, partition)

        return grid

    partition = 0

    while part1(grid):
        x, y = [(x, y) for (y, line) in enumerate(grid)
                for (x, cell) in enumerate(line) if cell == 0][0]
        partition += 1
        grid = fill(grid, x, y, partition)

    return partition


def main():
    input = 'wenycdww'
    grid = make_grid(input)

    print(part1(grid))
    print(part2(grid))


if __name__ == '__main__':
    main()
