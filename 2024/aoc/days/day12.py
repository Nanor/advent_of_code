from aoc.grid import Grid, StrGrid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2

DIRECTIONS = [
    Vec2(1, 0),
    Vec2(0, 1),
    Vec2(-1, 0),
    Vec2(0, -1),
]


class Day12(Puzzle):
    day = 12

    plants: StrGrid

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.plants = StrGrid.from_data(self.data)

    def get_area(
        self, pos: Vec2, visited: Grid[bool]
    ) -> tuple[set[Vec2], set[tuple[Vec2, int]]]:
        visited.set(pos, True)

        area: set[Vec2] = set([pos])
        perimeter: set[tuple[Vec2, int]] = set()

        for i, d in enumerate(DIRECTIONS):
            try:
                if self.plants.get(pos) != self.plants.get(pos + d):
                    perimeter.add((pos, i))
                elif not visited.get(pos + d):
                    a, p = self.get_area(pos + d, visited)
                    area = area.union(a)
                    perimeter = perimeter.union(p)
            except IndexError:
                perimeter.add((pos, i))

        return area, perimeter

    def part1(self) -> int:
        visited = Grid[bool].with_default(self.plants.width, self.plants.height, False)

        total = 0

        for x in range(self.plants.width):
            for y in range(self.plants.height):
                if not visited.get(Vec2(x, y)):
                    area, perimeter = self.get_area(Vec2(x, y), visited)
                    total += len(area) * len(perimeter)

        return total

    def remove_side(self, side: tuple[Vec2, int], sides: set[tuple[Vec2, int]]) -> None:
        if side not in sides:
            return

        sides.remove(side)

        d = side[1]
        if d % 2 == 0:
            self.remove_side((side[0] + DIRECTIONS[1], d), sides)
            self.remove_side((side[0] + DIRECTIONS[3], d), sides)
        else:
            self.remove_side((side[0] + DIRECTIONS[0], d), sides)
            self.remove_side((side[0] + DIRECTIONS[2], d), sides)

    def part2(self) -> int:
        visited = Grid[bool].with_default(self.plants.width, self.plants.height, False)

        total = 0

        for x in range(self.plants.width):
            for y in range(self.plants.height):
                if not visited.get(Vec2(x, y)):
                    area, perimeter = self.get_area(Vec2(x, y), visited)

                    sides = 0
                    while len(perimeter):
                        for s in perimeter:
                            self.remove_side(s, perimeter)
                            sides += 1
                            break

                    total += len(area) * sides

        return total
