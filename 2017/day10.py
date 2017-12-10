#!/usr/local/bin/python3
from functools import reduce


class Ring:

    def __init__(self, size):
        self._ring = list(range(size))
        self.size = size

    def __getitem__(self, index):
        if isinstance(index, slice):
            return [self[x] for x in range(index.start or 0, index.stop, index.step or 1)]
        else:
            return self._ring[index % self.size]

    def __setitem__(self, index, value):
        if isinstance(index, slice):
            for x, v in zip(range(index.start or 0, index.stop, index.step or 1), value):
                self[x] = v
        else:
            self._ring[index % self.size] = value


def part1(input):
    lengths = [int(x) for x in input.split(',')]
    ring = Ring(256)
    current = 0
    skip = 0

    for length in lengths:
        ring[current:current +
             length] = reversed(ring[current:current + length])
        current += length + skip
        skip += 1

    return ring[0] * ring[1]


def part2(input):
    lengths = [ord(c) for c in input] + [17, 31, 73, 47, 23]
    ring = Ring(256)
    current = 0
    skip = 0

    for length in lengths * 64:
        ring[current:current +
             length] = reversed(ring[current:current + length])
        current += length + skip
        skip += 1

    dense = [reduce((lambda x, y: x ^ y), ring[n:n + 16])
             for n in range(0, 256, 16)]
    hexes = [hex(n)[2:].zfill(2) for n in dense]

    return ''.join(hexes)


def main():
    with open('day10.txt') as f:
        input = f.read()

    print(part1(input))
    print(part2(input))

if __name__ == '__main__':
    main()
