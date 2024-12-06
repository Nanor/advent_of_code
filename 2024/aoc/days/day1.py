import re
from aoc.puzzle import Puzzle


class Day1(Puzzle):
    day = 1
    left: list[int]
    right: list[int]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        (left, right) = zip(
            *[re.split(r"\s+", line) for line in self.data.splitlines()]
        )
        self.left = [int(l) for l in left]
        self.right = [int(r) for r in right]

    @property
    def parsed(self) -> tuple[list[int], list[int]]:
        (left, right) = zip(
            *[re.split(r"\s+", line) for line in self.data.splitlines()]
        )

        left = [int(l) for l in left]
        right = [int(r) for r in right]

        return left, right

    def part1(self) -> int:
        self.left.sort()
        self.right.sort()

        return sum(abs(a - b) for (a, b) in zip(self.left, self.right))

    def part2(self) -> int:
        return sum(
            n * self.left.count(n) * self.right.count(n)
            for n in {*self.left, *self.right}
        )
