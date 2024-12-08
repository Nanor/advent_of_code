from aoc.grid import Grid
from aoc.puzzle import Puzzle


DIRECTIONS = [
    (0, -1),
    (1, 0),
    (0, 1),
    (-1, 0),
]


def add(a: tuple[int, int], b: tuple[int, int]) -> tuple[int, int]:
    return (a[0] + b[0], a[1] + b[1])


class LoopError(RuntimeError):
    pass


class Guard(Grid):
    pos: tuple[int, int]
    dir: int

    def __init__(self, data: str) -> None:
        super().__init__(data)

        self.pos = next(
            (x, y)
            for x in range(self.width)
            for y in range(self.height)
            if self.get(x, y) == "^"
        )
        self.dir = 0

    def walk(self) -> list[bool]:
        visited: list[bool] = [False] * self.width * self.height
        visited_directions: list[bool] = [False] * self.width * self.height * 4

        while True:
            v_index = self.pos[0] + self.pos[1] * self.width
            vd_index = v_index * 4 + self.dir

            if visited_directions[vd_index]:
                raise LoopError()

            visited[v_index] = True
            visited_directions[vd_index] = True

            try:
                while self.get(*add(self.pos, DIRECTIONS[self.dir])) == "#":
                    self.dir = (self.dir + 1) % 4
            except IndexError:
                return visited

            self.pos = add(self.pos, DIRECTIONS[self.dir])


class Day6(Puzzle):
    day = 6

    def part1(self) -> int:
        guard = Guard(self.data)
        return guard.walk().count(True)

    def part2(self) -> int:
        guard = Guard(self.data)
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
            guard.set(x, y, "#")

            try:
                guard.walk()
            except LoopError:
                loops += 1

            guard.set(x, y, ".")

        return loops
