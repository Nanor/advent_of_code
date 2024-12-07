from aoc.puzzle import Puzzle


class Equation:
    result: int
    parts: list[int]

    def __init__(self, line: str) -> None:
        a, b = line.split(": ")

        self.result = int(a)
        self.parts = [int(d) for d in b.split(" ")]

    def is_valid(self, part1: bool = True) -> bool:
        def solve(ps: list[int]) -> bool:
            if ps[0] > self.result:
                return False

            if len(ps) == 1:
                return ps[0] == self.result

            [a, b, *rs] = ps
            basic = solve([a + b, *rs]) or solve([a * b, *rs])

            if part1:
                return basic
            return basic or solve([int(f"{a}{b}"), *rs])

        return solve(self.parts)


class Day7(Puzzle):
    day = 7

    equations: list[Equation]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.equations = [Equation(line) for line in self.data.splitlines()]

    def part1(self) -> int:
        return sum([e.result for e in self.equations if e.is_valid()])

    def part2(self) -> int:
        return sum([e.result for e in self.equations if e.is_valid(False)])
