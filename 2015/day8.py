#!/usr/local/bin/python3
import re


def part1(strings):
    count = 0
    for string in strings:
        length = len(string)

        string = re.sub(r'^"', "", string)
        string = re.sub(r'"$', "", string)
        string = re.sub(r"\\\\", "b", string)
        string = re.sub(r"\\\"", "b", string)
        string = re.sub(r"\\x..", "b", string)

        count += length - len(string)

    return count


def part2(strings):
    count = 0
    for string in strings:
        length = len(string)

        string = re.sub(r"\"", "bb", string)
        string = re.sub(r"\\", "bb", string)

        count += 2 + len(string) - length

    return count


def main():
    with open("../files/2015_08_input.txt") as f:
        strings = [line.strip() for line in f]

    print(part1(strings))
    print(part2(strings))


if __name__ == "__main__":
    main()
