from itertools import product
from aoc.puzzle import Puzzle

Schematic = list[int]


class Day25(Puzzle):
    day = 25

    locks: list[Schematic]
    keys: list[Schematic]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.locks = []
        self.keys = []

        for schem in self.data.split("\n\n"):
            lock = schem.startswith("#####")
            schematic = schem.splitlines()

            s: Schematic = []

            for x in range(5):
                c = 0
                for y in range(1, 6):
                    if schematic[y][x] == "#":
                        c += 1
                s.append(c)

            if lock:
                self.locks.append(s)
            else:
                self.keys.append(s)

    def part1(self) -> int:
        total = 0

        for lock, key in product(self.locks, self.keys):
            sums = [l + k for (l, k) in zip(lock, key)]
            if not any([s > 5 for s in sums]):
                total += 1

        return total

    def part2(self) -> str:
        return ""
