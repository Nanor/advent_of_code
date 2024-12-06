from aoc.grid import Grid
from aoc.puzzle import Puzzle


class SearchGrid(Grid):
    def get_line(self, x: int, y: int, dx: int, dy: int, length: int = 4) -> str:
        return "".join((self.get(x + dx * i, y + dy * i) for i in range(length)))


class Day4(Puzzle):
    day = 4
    grid: SearchGrid

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)
        self.grid = SearchGrid(self.data)

    def part1(self) -> int:
        total = 0

        ds = [
            [0, 1],
            [1, 0],
            [1, 1],
            [-1, 1],
        ]

        for x in range(self.grid.width):
            for y in range(self.grid.height):
                for dx, dy in ds:
                    try:
                        line = self.grid.get_line(x, y, dx, dy)
                    except IndexError:
                        continue
                    if line == "XMAS" or line == "SAMX":
                        total += 1

        return total

    def part2(self) -> int:
        total = 0

        for x in range(1, self.grid.width - 1):
            for y in range(1, self.grid.height - 1):
                if self.grid.get(x, y) != "A":
                    continue

                pos = self.grid.get_line(x - 1, y - 1, 1, 1, 3)
                neg = self.grid.get_line(x + 1, y - 1, -1, 1, 3)

                if (pos == "MAS" or pos == "SAM") and (neg == "MAS" or neg == "SAM"):
                    total += 1

        return total
