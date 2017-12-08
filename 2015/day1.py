#!/usr/local/bin/python3


def part1(inputs):
    return inputs.count('(') - inputs.count(')')


def part2(inputs):
    floor = 0
    i = 1

    for c in inputs:
        if c == '(':
            floor += 1
        elif c == ')':
            floor -= 1

        if floor < 0:
            return i

        i += 1


def main():
    with open('day1.txt') as f:
        inputs = f.read().strip()

    print(part1(inputs))
    print(part2(inputs))

if __name__ == '__main__':
    main()
