from collections import defaultdict
from dataclasses import dataclass
from itertools import combinations
from aoc.vec import Vec2
from aoc.grid import StrGrid
from aoc.puzzle import Puzzle


@dataclass
class Antenna:
    position: Vec2
    frequency: str


class Day8(Puzzle):
    day = 8

    width: int
    height: int
    antennae: dict[str, list[Antenna]]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        grid = StrGrid.from_data(self.data)
        self.width = grid.width
        self.height = grid.height

        self.antennae = defaultdict(lambda: [])
        for x in range(grid.width):
            for y in range(grid.height):
                freq = grid.get(Vec2(x, y))
                if freq != ".":
                    self.antennae[freq].append(Antenna(Vec2(x, y), freq))

    def in_bounds(self, position: Vec2) -> bool:
        return (
            position.x >= 0
            and position.x < self.width
            and position.y >= 0
            and position.y < self.height
        )

    def part1(self) -> int:
        antinodes: set[Vec2] = set()

        for anns in self.antennae.values():
            for a, b in combinations(anns, 2):
                d = a.position - b.position

                if self.in_bounds(a.position + d):
                    antinodes.add(a.position + d)

                if self.in_bounds(a.position - 2 * d):
                    antinodes.add(a.position - 2 * d)

        return len(antinodes)

    def part2(self) -> int:
        antinodes: set[Vec2] = set()

        for anns in self.antennae.values():
            for a, b in combinations(anns, 2):
                d: Vec2 = a.position - b.position

                i = 0
                while True:
                    pos = a.position + d * i
                    if self.in_bounds(pos):
                        antinodes.add(pos)
                        i += 1
                    else:
                        break

                i = -1
                while True:
                    pos = a.position + d * i
                    if self.in_bounds(pos):
                        antinodes.add(pos)
                        i -= 1
                    else:
                        break

        return len(antinodes)
