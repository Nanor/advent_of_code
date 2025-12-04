#!/usr/local/bin/python3
import re
import json


def part1(groups):
    groups = re.sub(r"!.", "", groups)
    groups = re.sub(r"<[^>]*>", "", groups)
    groups = re.sub(r"[^{}]", "", groups)
    groups = re.sub(r"}{", "},{", groups)
    groups = re.sub(r"{", "[", groups)
    groups = re.sub(r"}", "]", groups)
    groups = json.loads(groups)

    def calculate(groups, count):
        return count + sum(calculate(g, count + 1) for g in groups)

    return calculate(groups, 1)


def part2(groups):
    groups = re.sub(r"!.", "", groups)
    garbage = re.findall(r"<[^>]*>", groups)

    return sum(len(g) - 2 for g in garbage)


def main():
    with open("../files/2017_09_input.txt") as f:
        groups = f.read().strip()

    print(part1(groups))
    print(part2(groups))


if __name__ == "__main__":
    main()
