import re
from aoc.puzzle import Puzzle


class Day3(Puzzle):
    day = 3

    def part1(self) -> int:
        regex = re.compile(r"mul\((\d+),(\d+)\)")

        total = 0
        for x, y in regex.findall(self.data):
            total += int(x) * int(y)

        return total

    def part2(self) -> int:
        regex = re.compile(r"mul\((\d+),(\d+)\)|(do\(\))|(don't\(\))")

        total = 0
        enabled: bool = True
        for x, y, e, d in regex.findall(self.data):
            if e:
                enabled = True
            elif d:
                enabled = False
            elif enabled:
                total += int(x) * int(y)

        return total
