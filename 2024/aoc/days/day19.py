from functools import cache
from aoc.puzzle import Puzzle


class Day19(Puzzle):
    day = 19

    towels: list[str]
    patterns: list[str]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)
        [p1, p2] = self.data.split("\n\n")

        self.towels = [t for t in p1.split(", ")]
        self.patterns = p2.splitlines()

    @cache
    def count(self, pattern: str) -> int:
        if pattern == "":
            return 1

        return sum(
            [
                self.count(pattern.removeprefix(t))
                for t in self.towels
                if pattern.startswith(t)
            ]
        )

    def part1(self) -> int:
        return len([p for p in self.patterns if self.count(p) > 0])

    def part2(self) -> int:
        return sum([self.count(p) for p in self.patterns])
