from dataclasses import dataclass
from functools import reduce
import re
from aoc.puzzle import Puzzle
from aoc.vec import Vec2


@dataclass
class Robot:
    pos: Vec2
    vel: Vec2

    def move(self, steps: int, bounds: Vec2):
        pos: Vec2 = self.pos + self.vel * steps
        self.pos = Vec2(pos.x % bounds.x, pos.y % bounds.y)


class Day14(Puzzle):
    day = 14

    robots: list[Robot]
    bounds: Vec2

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.robots = []

        for robot_str in self.data.splitlines():
            [vals] = re.findall(r"p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)", robot_str)
            [p_x, p_y, v_x, v_y] = [int(v) for v in vals]

            self.robots.append(
                Robot(
                    Vec2(p_x, p_y),
                    Vec2(v_x, v_y),
                )
            )

        self.bounds = Vec2(
            max(r.pos.x for r in self.robots), max(r.pos.y for r in self.robots)
        ) + Vec2(1, 1)

    def __repr__(self) -> str:
        out = [[0] * self.bounds.x for _ in range(self.bounds.y)]
        for r in self.robots:
            out[r.pos.y][r.pos.x] += 1

        return "\n".join(["".join([str(x) if x > 0 else " " for x in l]) for l in out])

    def part1(self) -> int:
        for robot in self.robots:
            robot.move(100, self.bounds)

        quads: list[int] = [0, 0, 0, 0]

        for robot in self.robots:
            if (
                robot.pos.x == (self.bounds.x - 1) // 2
                or robot.pos.y == (self.bounds.y - 1) // 2
            ):
                continue

            x = robot.pos.x < (self.bounds.x - 1) // 2
            y = robot.pos.y < (self.bounds.y - 1) // 2

            if x and y:
                quads[0] += 1
            if not x and y:
                quads[1] += 1
            if x and not y:
                quads[2] += 1
            if not x and not y:
                quads[3] += 1

        return reduce(lambda a, b: a * b, quads)

    def part2(self) -> int:
        i = 101
        while True:
            for robot in self.robots:
                robot.move(1, self.bounds)

            occupied: set[Vec2] = set()
            for r in self.robots:
                if r.pos in occupied:
                    break
                occupied.add(r.pos)
            else:
                return i

            i += 1
