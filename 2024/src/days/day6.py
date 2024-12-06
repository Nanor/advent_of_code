from aocd import get_data
from tqdm import tqdm

from src.Grid import Grid

DIRECTIONS = {
    "U": (0, -1),
    "R": (1, 0),
    "D": (0, 1),
    "L": (-1, 0),
}
DIRS = ["U", "R", "D", "L"]


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
        self.set(*self.pos, ".")

    def walk(self):
        visited = 0

        while True:
            if self.get(*self.pos) == self.dir:
                raise LoopError()

            if self.get(*self.pos) == ".":
                visited += 1
                self.set(*self.pos, self.dir)

            try:
                while (
                    self.get(
                        self.pos[0] + DIRECTIONS[self.dir][0],
                        self.pos[1] + DIRECTIONS[self.dir][1],
                    )
                    == "#"
                ):
                    self.dir = DIRS[(DIRS.index(self.dir) + 1) % 4]
            except IndexError:
                return visited

            self.pos = (
                self.pos[0] + DIRECTIONS[self.dir][0],
                self.pos[1] + DIRECTIONS[self.dir][1],
            )


def part1(data: str) -> int:
    guard = Guard(data)

    return guard.walk()


def part2(data: str) -> int:
    g = Guard(data)
    start_pos = g.pos
    g.walk()

    loops = 0

    for x, y in tqdm(
        [
            (x, y)
            for x in range(g.width)
            for y in range(g.height)
            if (x, y) != start_pos and g.get(x, y) in "URDL"
        ]
    ):
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
