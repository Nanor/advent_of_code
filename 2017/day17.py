#!/usr/local/bin/python3


def part1(input):
    output = [0]
    current = 0

    for n in range(1, 2017 + 1):
        current = (current + input) % len(output) + 1
        output.insert(current, n)

    return output[output.index(2017) + 1]


def part2(input):
    times = 50000000
    current = 0

    for n in range(1, times + 1):
        current = (current + input) % n + 1

        if current == 1:
            result = n

    return result


def main():
    input = 354

    print(part1(input))
    print(part2(input))

if __name__ == '__main__':
    main()
