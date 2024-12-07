from aoc.puzzle import Puzzle


class Equation:
    result: int
    parts: list[int]

    def __init__(self, line: str) -> None:
        a, b = line.split(": ")

        self.result = int(a)
        self.parts = [int(d) for d in b.split(" ")]

    def is_valid(self, part2: bool = False) -> bool:
        def solve(acc: int, ps: list[int]) -> bool:
            [*rs, v] = ps

            if not rs:
                return v == acc

            return (
                (
                    part2
                    and acc != v
                    and f"{acc}".endswith(f"{v}")
                    and solve(int(f"{acc}".removesuffix(f"{v}")), rs)
                )
                or (acc % v == 0 and solve(acc // v, rs))
                or (acc >= v and solve(acc - v, rs))
            )

        return solve(self.result, self.parts)


class Day7(Puzzle):
    day = 7

    equations: list[Equation]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.equations = [Equation(line) for line in self.data.splitlines()]

    def part1(self) -> int:
        return sum([e.result for e in self.equations if e.is_valid()])

    def part2(self) -> int:
        return sum([e.result for e in self.equations if e.is_valid(True)])
