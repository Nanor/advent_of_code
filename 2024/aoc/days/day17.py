from dataclasses import dataclass
import re

from aoc.puzzle import Puzzle


class Halt(Exception):
    pass


@dataclass
class State:
    a: int
    b: int
    c: int
    pc: int

    out: list[int]

    def copy(self):
        return State(self.a, self.b, self.c, self.pc, [*self.out])

    def step(self, program: list[int]) -> None:
        try:
            inst = program[self.pc]
            op = program[self.pc + 1]
        except IndexError:
            raise Halt()

        if inst == 0:
            self.a = self.a // (2 ** self.get_combo(op))
        elif inst == 1:
            self.b = self.b ^ op
        elif inst == 2:
            self.b = self.get_combo(op) % 8
        elif inst == 3:
            if self.a != 0:
                self.pc = op
                return
        elif inst == 4:
            self.b = self.b ^ self.c
        elif inst == 5:
            self.out.append(self.get_combo(op) % 8)
        elif inst == 6:
            self.b = self.a // (2 ** self.get_combo(op))
        elif inst == 7:
            self.c = self.a // (2 ** self.get_combo(op))

        self.pc += 2

    def get_combo(self, op: int) -> int:
        if op <= 3:
            return op
        if op == 4:
            return self.a
        if op == 5:
            return self.b
        if op == 6:
            return self.c
        raise ValueError("Unknown operand")

    def run(self, program: list[int]) -> list[int]:
        state = self.copy()
        try:
            while True:
                state.step(program)

        except Halt:
            return state.out


class Day17(Puzzle):
    day = 17

    program: list[int]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        [prog] = re.findall(r"Program: ([0-9,]+)", self.data)
        self.program = [int(x) for x in prog.split(",")]

    def part1(self) -> str:
        [a] = re.findall(r"Register A: (\d+)", self.data)
        [b] = re.findall(r"Register B: (\d+)", self.data)
        [c] = re.findall(r"Register C: (\d+)", self.data)

        state = State(int(a), int(b), int(c), 0, [])
        out = state.run(self.program)
        return ",".join([str(x) for x in out])

    def part2(self) -> int:
        def pack(answer: list[int]) -> int:
            a = 0
            for x in answer:
                a = a << 3 | x
            return a

        def inner(answer: list[int], n: int) -> list[int] | None:
            if n == len(self.program):
                return answer

            ans = list(answer)

            for m in range(8):
                ans[n] = m
                out = State(pack(ans), 0, 0, 0, []).run(self.program)

                if self.program[-n - 1 :] == out[-n - 1 :]:
                    x = inner(ans, n + 1)
                    if x is not None:
                        return x

        out = inner([0] * len(self.program), 0)
        if out is not None:
            return pack(out)
        raise Exception("No answer found")
