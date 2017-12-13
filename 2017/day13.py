#!/usr/local/bin/python3
import re


def travel(layers, starting_time):
    return [layer for layer in layers if (layer + starting_time) % (2 * layers[layer] - 2) == 0]


def part1(layers):
    return sum(layer * layers[layer] for layer in travel(layers, 0))


def part2(layers):
    delay = 0
    while True:
        if not travel(layers, delay):
            return delay
        delay += 1


def main():
    layers = {}
    with open('day13.txt') as f:
        for line in f:
            m = re.search(r'^(\d+): (\d+)$', line)
            (layer, depth) = m.groups()
            layers[int(layer)] = int(depth)

    print(part1(layers))
    print(part2(layers))


if __name__ == '__main__':
    main()
