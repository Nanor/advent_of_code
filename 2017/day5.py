#!/usr/local/bin/python3


def part1(instructions):
    i = 0
    c = 0

    while 0 <= i < len(instructions):
        new_i = i + instructions[i]
        instructions[i] += 1
        i = new_i
        c += 1

    return c


def part2(instructions):
    i = 0
    c = 0

    while 0 <= i < len(instructions):
        new_i = i + instructions[i]

        if instructions[i] >= 3:
            instructions[i] -= 1
        else:
            instructions[i] += 1

        i = new_i
        c += 1

    return c


def main():
    with open("../files/2017_05_input.txt") as f:
        inputs = [int(line) for line in f]

    print(part1(list(inputs)))
    print(part2(list(inputs)))


if __name__ == "__main__":
    main()
