from dataclasses import dataclass
import re
from aoc.puzzle import Puzzle
from aoc.vec import Vec2
import numpy as np


@dataclass
class Claw:
    button_a: Vec2
    button_b: Vec2
    prize: Vec2

    def get_presses(self) -> tuple[int, int] | None:
        mat = np.array([list(self.button_a), list(self.button_b)]).transpose()
        res = np.linalg.inv(mat) @ np.array(list(self.prize)).transpose()

        a: int = round(res[0])
        b: int = round(res[1])

        if a * self.button_a + b * self.button_b == self.prize:
            return a, b

        return None


class Day13(Puzzle):
    day = 13

    claws: list[Claw]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.claws = []

        for claw_str in self.data.split("\n\n"):
            [(a_x, a_y)] = re.findall(r"Button A: X\+(\d+), Y\+(\d+)", claw_str)
            [(b_x, b_y)] = re.findall(r"Button B: X\+(\d+), Y\+(\d+)", claw_str)
            [(prize_x, prize_y)] = re.findall(r"Prize: X=(\d+), Y=(\d+)", claw_str)

            self.claws.append(
                Claw(
                    Vec2(int(a_x), int(a_y)),
                    Vec2(int(b_x), int(b_y)),
                    Vec2(int(prize_x), int(prize_y)),
                )
            )

    def part1(self) -> int:
        total = 0

        for claw in self.claws:
            if presses := claw.get_presses():
                total += presses[0] * 3 + presses[1]

        return total

    def part2(self) -> int:
        total = 0

        for claw in self.claws:
            claw.prize += Vec2(10000000000000, 10000000000000)
            if presses := claw.get_presses():
                total += presses[0] * 3 + presses[1]

        return total
