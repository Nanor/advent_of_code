from collections import defaultdict
from dataclasses import dataclass
from itertools import combinations
from aoc.grid import Grid
from aoc.puzzle import Puzzle


@dataclass
class Antenna:
    x: int
    y: int
    frequency: str


class Day8(Puzzle):
    day = 8

    width: int
    height: int
    antennae: dict[str, list[Antenna]]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        grid = Grid(self.data)
        self.width = grid.width
        self.height = grid.height

        self.antennae = defaultdict(lambda: [])
        for x in range(grid.width):
            for y in range(grid.height):
                freq = grid.get(x, y)
                if freq != ".":
                    self.antennae[freq].append(Antenna(x, y, freq))

    def in_bounds(self, x: int, y: int) -> bool:
        return x >= 0 and x < self.width and y >= 0 and y < self.height

    def part1(self) -> int:
        antinodes: set[tuple[int, int]] = set()

        for anns in self.antennae.values():
            for a, b in combinations(anns, 2):
                dx = a.x - b.x
                dy = a.y - b.y

                if self.in_bounds(a.x + dx, a.y + dy):
                    antinodes.add((a.x + dx, a.y + dy))

                if self.in_bounds(a.x - 2 * dx, a.y - 2 * dy):
                    antinodes.add((a.x - 2 * dx, a.y - 2 * dy))

        return len(antinodes)

    def part2(self) -> int:
        antinodes: set[tuple[int, int]] = set()

        for anns in self.antennae.values():
            for a, b in combinations(anns, 2):
                dx: int = a.x - b.x
                dy: int = a.y - b.y

                i = 0
                while True:
                    pos = (a.x + dx * i, a.y + dy * i)
                    if self.in_bounds(*pos):
                        antinodes.add(pos)
                        i += 1
                    else:
                        break

                i = -1
                while True:
                    pos = (a.x + dx * i, a.y + dy * i)
                    if self.in_bounds(*pos):
                        antinodes.add(pos)
                        i -= 1
                    else:
                        break

        return len(antinodes)
