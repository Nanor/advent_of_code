from aoc.puzzle import Puzzle


def sign(a: int, b: int) -> int:
    if a == b:
        return 0
    return 1 if a > b else -1


def is_valid(levels: list[int]) -> bool:
    direction = sign(levels[0], levels[1])
    for v in range(1, len(levels)):
        diff = abs(levels[v] - levels[v - 1])
        if sign(levels[v - 1], levels[v]) != direction or diff < 1 or diff > 3:
            return False

    return True


class Day2(Puzzle):
    day = 2
    reports: list[list[int]]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.reports = [
            [int(d) for d in l.split(" ")]
            for l in self.data.splitlines()
            if len(l.strip())
        ]

    def part1(self) -> int:
        total = 0
        for report in self.reports:
            if is_valid(report):
                total += 1

        return total

    def part2(self) -> int:
        total = 0
        for report in self.reports:
            if is_valid(report):
                total += 1
                continue

            for i in range(0, len(report)):
                levels = report[:i] + report[i + 1 :]
                if is_valid(levels):
                    total += 1
                    break

        return total
