from aocd import get_data
from src.Grid import Grid


DIRECTIONS = {
    "U": (0, -1),
    "R": (1, 0),
    "D": (0, 1),
    "L": (-1, 0),
}
DIRS = ["U", "R", "D", "L"]
NEXT_DIR = {"U": "R", "R": "D", "D": "L", "L": "U"}


def add(a: tuple[int, int], b: tuple[int, int]) -> tuple[int, int]:
    return (a[0] + b[0], a[1] + b[1])


class LoopError(RuntimeError):
    pass


class Guard(Grid):
    pos: tuple[int, int]
    dir: str

    def __init__(self, data: str) -> None:
        super().__init__(data)

        self.pos = next(
            (x, y)
            for x in range(self.width)
            for y in range(self.height)
            if self.get(x, y) == "^"
        )
        self.dir = "U"

    def walk(self) -> set[tuple[int, int]]:
        visited: set[tuple[int, int]] = set()
        visited_directions: set[tuple[int, int, str]] = set()

        while True:
            if (*self.pos, self.dir) in visited_directions:
                raise LoopError()

            visited.add(self.pos)
            visited_directions.add((*self.pos, self.dir))

            try:
                while self.get(*add(self.pos, DIRECTIONS[self.dir])) == "#":
                    self.dir = NEXT_DIR[self.dir]
            except IndexError:
                return visited

            self.pos = add(self.pos, DIRECTIONS[self.dir])


def part1(data: str) -> int:
    guard = Guard(data)
    return len(guard.walk())


def part2(data: str) -> int:
    g = Guard(data)
    start_pos = g.pos
    positions = g.walk()
    positions.remove(start_pos)
    positions = list(positions)

    loops: int = 0

    for x, y in positions:
        guard = Guard(data)
        guard.set(x, y, "#")

        try:
            guard.walk()
        except LoopError:
            loops += 1

    return loops


def main() -> None:
    data = get_data(year=2024, day=6)
    print(part1(data))
    print(part2(data))


if __name__ == "__main__":
    main()
