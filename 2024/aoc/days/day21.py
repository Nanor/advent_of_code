from functools import cache
from aoc.puzzle import Puzzle
from aoc.vec import Vec2

NUM_PAD_LOCS = {
    "7": Vec2(0, 0),
    "8": Vec2(1, 0),
    "9": Vec2(2, 0),
    "4": Vec2(0, 1),
    "5": Vec2(1, 1),
    "6": Vec2(2, 1),
    "1": Vec2(0, 2),
    "2": Vec2(1, 2),
    "3": Vec2(2, 2),
    "0": Vec2(1, 3),
    "A": Vec2(2, 3),
}

D_PAD_LOCS = {
    "^": Vec2(1, 0),
    "A": Vec2(2, 0),
    "<": Vec2(0, 1),
    "v": Vec2(1, 1),
    ">": Vec2(2, 1),
}


def path_from_to(a: Vec2, b: Vec2, num: bool) -> list[str]:
    x_path = ("<" if a.x > b.x else ">") * abs(a.x - b.x)
    y_path = ("^" if a.y > b.y else "v") * abs(a.y - b.y)

    p1 = x_path + y_path
    p2 = y_path + x_path

    if a.x == b.x or a.y == b.y:
        return [p1]

    if (num and b.x == 0 and a.y == 3) or (not num and b.x == 0 and a.y == 0):
        return [p2]

    if (num and a.x == 0 and b.y == 3) or (not num and a.x == 0 and b.y == 0):
        return [p1]

    return [p1, p2]


def pad_path(code: str, num: bool) -> list[list[str]]:
    locs = NUM_PAD_LOCS if num else D_PAD_LOCS
    outs: list[list[str]] = []
    for i, c in enumerate(code):
        f = locs["A"] if i == 0 else locs[code[i - 1]]
        t = locs[c]

        outs.append([p + "A" for p in path_from_to(f, t, num)])
    return outs


@cache
def code_length(code: str, steps: int, num: bool) -> int:
    if steps == 0:
        return len(code)

    total = 0
    for parts in pad_path(code, num):
        total += min(code_length(p, steps - 1, False) for p in parts)

    return total


class Day21(Puzzle):
    day = 21

    def solve(self, steps: int) -> int:
        total = 0

        for code in self.data.splitlines():
            length = code_length(code, steps + 1, True)
            total += length * int(code[:-1])

        return total

    def part1(self) -> int:
        return self.solve(2)

    def part2(self) -> int:
        return self.solve(25)
