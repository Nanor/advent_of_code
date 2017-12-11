#!/usr/local/bin/python3


def say(input):
    split = []
    for c in input:
        if len(split) == 0 or split[-1][0] != c:
            split.append(c)
        else:
            split[-1] += c

    return ''.join(str(len(x)) + x[0] for x in split)


def say_multiple(input, times):
    for _ in range(times):
        input = say(input)

    return input


def main():
    input = '1321131112'

    # part1
    output = say_multiple(input, 40)
    print(len(output))

    # part2
    print(len(say_multiple(output, 10)))


if __name__ == '__main__':
    main()
