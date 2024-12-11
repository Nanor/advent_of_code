from functools import cache
from aoc.puzzle import Puzzle


@cache
def count(stone: int, steps: int) -> int:
    if steps == 0:
        return 1

    if stone == 0:
        return count(1, steps - 1)

    if len(f"{stone}") % 2 == 0:
        st = f"{stone}"
        a = int(st[: len(st) // 2])
        b = int(st[len(st) // 2 :])
        return count(a, steps - 1) + count(b, steps - 1)

    return count(stone * 2024, steps - 1)


class Day11(Puzzle):
    day = 11

    def solve(self, steps: int) -> int:
        stones: list[int] = [int(s) for s in self.data.split(" ")]

        return sum([count(s, steps) for s in stones])

    def part1(self) -> int:
        return self.solve(25)

    def part2(self) -> int:
        return self.solve(75)
