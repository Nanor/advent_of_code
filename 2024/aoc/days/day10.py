from aoc.grid import Grid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2


DIRECTIONS = [
    Vec2(1, 0),
    Vec2(-1, 0),
    Vec2(0, 1),
    Vec2(0, -1),
]


class Day10(Puzzle):
    day = 10

    grid: Grid

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.grid = Grid(self.data)

    def count_ends(self, pos: Vec2) -> set[Vec2]:
        h = self.grid.get(pos)
        if h == "9":
            return set([pos])

        locs: set[Vec2] = set()

        for d in DIRECTIONS:
            try:
                new_p = pos + d
                if self.grid.get(new_p) == str(int(h) + 1):
                    locs = locs.union(self.count_ends(new_p))
            except IndexError:
                continue

        return locs

    def count_paths(self, pos: Vec2) -> int:
        h = self.grid.get(pos)
        if h == "9":
            return 1

        total = 0

        for d in DIRECTIONS:
            try:
                new_p = pos + d
                if self.grid.get(new_p) == str(int(h) + 1):
                    total += self.count_paths(new_p)
            except IndexError:
                continue

        return total

    def part1(self) -> int:
        total = 0

        for x in range(self.grid.width):
            for y in range(self.grid.height):
                pos = Vec2(x, y)
                if self.grid.get(pos) != "0":
                    continue

                total += len(self.count_ends(pos))

        return total

    def part2(self) -> int:
        total = 0

        for x in range(self.grid.width):
            for y in range(self.grid.height):
                pos = Vec2(x, y)
                if self.grid.get(pos) != "0":
                    continue

                total += self.count_paths(pos)

        return total
