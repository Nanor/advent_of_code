from aoc.grid import Grid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2


class SearchGrid(Grid):
    def get_line(self, start: Vec2, dir: Vec2, length: int = 4) -> str:
        return "".join((self.get(start + dir * i) for i in range(length)))


class Day4(Puzzle):
    day = 4
    grid: SearchGrid

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)
        self.grid = SearchGrid(self.data)

    def part1(self) -> int:
        total = 0

        ds = [
            Vec2(0, 1),
            Vec2(1, 0),
            Vec2(1, 1),
            Vec2(-1, 1),
        ]

        for x in range(self.grid.width):
            for y in range(self.grid.height):
                for d in ds:
                    try:
                        line = self.grid.get_line(Vec2(x, y), d)
                    except IndexError:
                        continue
                    if line == "XMAS" or line == "SAMX":
                        total += 1

        return total

    def part2(self) -> int:
        total = 0

        for x in range(1, self.grid.width - 1):
            for y in range(1, self.grid.height - 1):
                mid = Vec2(x, y)
                if self.grid.get(mid) != "A":
                    continue

                pos = self.grid.get_line(mid - Vec2(1, 1), Vec2(1, 1), 3)
                neg = self.grid.get_line(mid + Vec2(1, -1), Vec2(-1, 1), 3)

                if (pos == "MAS" or pos == "SAM") and (neg == "MAS" or neg == "SAM"):
                    total += 1

        return total
