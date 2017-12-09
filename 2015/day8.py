#!/usr/local/bin/python3
from re import escape

def part1(strings):
    return sum(len(string) - len(eval(string)) for string in strings)

def part2(strings):
    return sum(2 + len(escape(string)) - len(string) for string in strings)

def main():
    with open('day8.txt') as f:
        strings = [line.strip() for line in f]

    print(part1(strings))
    print(part2(strings))

if __name__ == '__main__':
    main()