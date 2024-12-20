from aoc.grid import StrGrid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2


DIRECTIONS = [Vec2(0, 1), Vec2(0, -1), Vec2(-1, 0), Vec2(1, 0)]


class Day20(Puzzle):
    day = 20

    grid: StrGrid
    start: Vec2
    end: Vec2

    dist_to_end: dict[Vec2, int]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.grid = StrGrid.from_data(self.data)
        self.start = self.grid.find("S")
        self.end = self.grid.find("E")

        self.dist_to_start = self._dist_to_point(self.start)
        self.dist_to_end = self._dist_to_point(self.end)

    def _dist_to_point(self, point: Vec2) -> dict[Vec2, int]:
        dists: dict[Vec2, int] = {point: 0}
        open: set[Vec2] = set([point])

        while len(open):
            curr = open.pop()
            for d in DIRECTIONS:
                next = curr + d
                if (
                    next not in dists or dists[curr] + 1 < dists[next]
                ) and self.grid.get(next) != "#":
                    dists[next] = dists[curr] + 1
                    open.add(next)

        return dists

    def solve(self, cheat_length: int) -> int:
        base_time = self.dist_to_end[self.start]
        output = 0

        for start in [
            Vec2(x, y)
            for x in range(self.grid.width)
            for y in range(self.grid.height)
            if Vec2(x, y) in self.dist_to_start
        ]:
            for end in [
                Vec2(x, y)
                for x in range(start.x - cheat_length, start.x + cheat_length + 1)
                for y in range(
                    start.y - cheat_length + abs(start.x - x),
                    start.y + cheat_length - abs(start.x - x) + 1,
                )
                if Vec2(x, y) in self.dist_to_end
            ]:
                cheat_dist = abs(start.x - end.x) + abs(start.y - end.y)
                time = self.dist_to_start[start] + self.dist_to_end[end] + cheat_dist
                if base_time - time >= 100:
                    output += 1

        return output

    def part1(self) -> int:
        return self.solve(2)

    def part2(self) -> int:
        return self.solve(20)
