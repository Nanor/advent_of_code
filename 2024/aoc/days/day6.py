from typing import Self
from aoc.grid import StrGrid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2


DIRECTIONS = [
    Vec2(0, -1),
    Vec2(1, 0),
    Vec2(0, 1),
    Vec2(-1, 0),
]


class LoopError(RuntimeError):
    pass


class Guard(StrGrid):
    pos: Vec2
    dir: int

    @classmethod
    def from_data(cls, data: str) -> Self:
        g = super().from_data(data)

        g.pos = next(
            Vec2(x, y)
            for x in range(g.width)
            for y in range(g.height)
            if g.get(Vec2(x, y)) == "^"
        )
        g.dir = 0

        return g

    def walk(self) -> list[bool]:
        visited: list[bool] = [False] * self.width * self.height
        visited_directions: list[bool] = [False] * self.width * self.height * 4

        while True:
            v_index = self.pos.x + self.pos.y * self.width
            vd_index = v_index * 4 + self.dir

            if visited_directions[vd_index]:
                raise LoopError()

            visited[v_index] = True
            visited_directions[vd_index] = True

            try:
                while self.get(self.pos + DIRECTIONS[self.dir]) == "#":
                    self.dir = (self.dir + 1) % 4
            except IndexError:
                return visited

            self.pos += DIRECTIONS[self.dir]


class Day6(Puzzle):
    day = 6

    def part1(self) -> int:
        guard = Guard.from_data(self.data)
        return guard.walk().count(True)

    def part2(self) -> int:
        guard = Guard.from_data(self.data)
        start_pos = guard.pos
        visited = guard.walk()

        positions = [
            (x, y)
            for x in range(guard.width)
            for y in range(guard.height)
            if (x, y) != start_pos and visited[x + y * guard.width]
        ]

        loops: int = 0

        for x, y in positions:
            guard.pos = start_pos
            guard.dir = 0
            guard.set(Vec2(x, y), "#")

            try:
                guard.walk()
            except LoopError:
                loops += 1

            guard.set(Vec2(x, y), ".")

        return loops
