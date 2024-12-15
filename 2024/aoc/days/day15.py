from aoc.grid import StrGrid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2

DIRECTIONS = {
    "^": Vec2(0, -1),
    "v": Vec2(0, 1),
    "<": Vec2(-1, 0),
    ">": Vec2(1, 0),
}


class Warehouse(StrGrid):
    robot: Vec2

    def __init__(self, width: int, height: int, data: list[list[str]]) -> None:
        super().__init__(width, height, data)

        self.robot = next(
            Vec2(x, y)
            for x in range(self.width)
            for y in range(self.height)
            if self.get(Vec2(x, y)) == "@"
        )

    def _test_move(self, move: Vec2, pos: Vec2) -> bool:
        next_loc = self.get(pos + move)

        if next_loc == "#":
            return False

        if next_loc == ".":
            return True

        if next_loc == "O":
            return self._test_move(move, pos + move)

        if next_loc in "[]" and move.y == 0:
            return self._test_move(move, pos + move)

        if next_loc == "[" and move.x == 0:
            return (self._test_move(move, pos + move)) and (
                self._test_move(move, pos + move + Vec2(1, 0))
            )

        if next_loc == "]" and move.x == 0:
            return self._test_move(move, pos + Vec2(-1, 0))

        raise Exception("Unknown case")

    def _move(self, move: Vec2, pos: Vec2) -> None:
        loc = self.get(pos)

        if loc == "[" and move.x == 0:
            self._move(move, pos + move)
            self._move(move, pos + move + Vec2(1, 0))

            self.set(pos + move, "[")
            self.set(pos, ".")
            self.set(pos + move + Vec2(1, 0), "]")
            self.set(pos + Vec2(1, 0), ".")
            return

        if loc == "]" and move.x == 0:
            self._move(move, pos + Vec2(-1, 0))
            return

        if loc != ".":
            self._move(move, pos + move)

            self.set(pos + move, loc)
            self.set(pos, ".")

    def move(self, move: str) -> None:
        if self._test_move(DIRECTIONS[move], self.robot):
            self._move(DIRECTIONS[move], self.robot)
            self.robot += DIRECTIONS[move]

    @property
    def total(self) -> int:
        total = 0

        for x in range(self.width):
            for y in range(self.height):
                if self.get(Vec2(x, y)) in "O[":
                    total += x + 100 * y

        return total


class Day15(Puzzle):
    day = 15

    warehouse_str: str
    moves: list[str]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        [self.warehouse_str, moves] = self.data.split("\n\n")

        self.moves = list(moves.replace("\n", ""))

    def part1(self) -> int:
        warehouse = Warehouse.from_data(self.warehouse_str)
        for move in self.moves:
            warehouse.move(move)

        return warehouse.total

    def part2(self) -> int:
        warehouse = Warehouse.from_data(
            self.warehouse_str.replace("#", "##")
            .replace("O", "[]")
            .replace(".", "..")
            .replace("@", "@.")
        )

        for move in self.moves:
            warehouse.move(move)

        return warehouse.total
