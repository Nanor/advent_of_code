from aoc.grid import Grid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2

DIRECTIONS = [Vec2(0, 1), Vec2(0, -1), Vec2(-1, 0), Vec2(1, 0)]


class Day18(Puzzle):
    day = 18

    bytes: list[Vec2]
    size: int

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.bytes = []
        self.size = 0
        for line in self.data.splitlines():
            (x, y) = [int(v) for v in line.split(",")]
            self.bytes.append(Vec2(x, y))
            self.size = max(self.size, x, y)

        self.size += 1

    def solve(self, count: int) -> int | None:
        grid = Grid(
            self.size, self.size, [[False] * self.size for _ in range(self.size)]
        )
        for loc in self.bytes[:count]:
            grid.set(loc, True)

        open: list[tuple[Vec2, int]] = [(Vec2(0, 0), 0)]
        closed: set[Vec2] = set()

        end = Vec2(self.size - 1, self.size - 1)

        while len(open):
            (loc, cost) = open.pop(0)

            if loc == end:
                return cost

            if loc in closed:
                continue
            closed.add(loc)

            for d in DIRECTIONS:
                try:
                    if not grid.get(loc + d):
                        open.append((loc + d, cost + 1))
                except IndexError:
                    pass

        return None

    def part1(self) -> int:
        return self.solve(1024) or 0

    def part2(self) -> str:
        lower = 0
        upper = len(self.bytes)

        while lower + 1 < upper:
            count = (lower + upper) // 2
            possible = self.solve(count) is not None

            if possible:
                lower = count
            else:
                upper = count

        byte = self.bytes[lower]
        return f"{byte.x},{byte.y}"
