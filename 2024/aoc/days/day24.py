from dataclasses import dataclass
from itertools import batched, product
from random import randint
import re
from typing import Literal, Self

from aoc.puzzle import Puzzle


@dataclass
class Gate:
    inputs: tuple[str, str]
    output: str
    type: Literal["AND"] | Literal["OR"] | Literal["XOR"]

    def copy(self) -> Self:
        return self.__class__(self.inputs, self.output, self.type)


def decode(wires: dict[str, bool], wire: str) -> int:
    total = 0

    outs = sorted([w for w in wires.keys() if w.startswith(wire)])
    for i, k in enumerate(outs):
        if wires[k]:
            total += 1 << i

    return total


def simulate(wires: dict[str, bool], gates: list[Gate]) -> int:
    while gates:
        changed = False
        for gate in gates:
            if (
                gate.inputs[0] in wires
                and gate.inputs[1] in wires
                and gate.output not in wires
            ):
                match gate.type:
                    case "AND":
                        out = wires[gate.inputs[0]] and wires[gate.inputs[1]]
                    case "OR":
                        out = wires[gate.inputs[0]] or wires[gate.inputs[1]]
                    case "XOR":
                        out = wires[gate.inputs[0]] != wires[gate.inputs[1]]

                wires[gate.output] = out
                changed = True

        if not changed:
            break

    return decode(wires, "z")


def dependencies(gates: list[Gate], i: int) -> set[str]:
    deps: set[str] = set([f"z{n:0>2}" for n in range(i + 1)])
    d_count = len(deps)

    while True:
        for g in gates:
            if g.output in deps:
                deps.update(g.inputs)

        if len(deps) == d_count:
            break
        d_count = len(deps)

    return deps


def test_gates(gates: list[Gate], size: int) -> bool:
    for _ in range(50):
        x = randint(0, (1 << 45) - 1)
        y = randint(0, (1 << 45) - 1)

        wires: dict[str, bool] = {}
        for n in range(45):
            wires[f"x{n:0>2}"] = bool(x & (1 << n))
            wires[f"y{n:0>2}"] = bool(y & (1 << n))

        z = simulate(wires, gates)

        if (x + y) % (2 << size) != z % (2 << size):
            return False

    return True


def swapped(gates: list[Gate], swaps: list[str]) -> list[Gate]:
    gs = list(gates)

    for [n, m] in batched(swaps, 2):
        for i, g in enumerate(gates):
            if g.output == n:
                gs[i] = g.copy()
                gs[i].output = m
            elif g.output == m:
                gs[i] = g.copy()
                gs[i].output = n

    return gs


class Day24(Puzzle):
    day = 24

    wires: dict[str, bool]
    gates: list[Gate]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.wires: dict[str, bool] = {}
        self.gates: list[Gate] = []

        [ws, gts] = self.data.split("\n\n")
        for w in ws.splitlines():
            [name, value] = w.split(": ")
            self.wires[name] = value == "1"

        regexp = re.compile(r"(\w+) (AND|OR|XOR) (\w+) -> (\w+)")
        for [i1, t, i2, o] in regexp.findall(gts):
            self.gates.append(Gate((i1, i2), o, t))

    def part1(self) -> int:
        return simulate(self.wires, self.gates)

    def part2(self) -> str:
        keys: set[str] = set([g.output for g in self.gates])

        frozen: set[str] = set()
        swaps: list[str] = []

        gates: list[Gate] = list(self.gates)

        for i in range(45):
            if not test_gates(gates, i):
                problems = dependencies(gates, i).difference(frozen)
                rest = keys.difference(frozen)
                for [a, b] in product(problems, rest):
                    gates = swapped(self.gates, swaps + [a, b])

                    if test_gates(gates, i):
                        swaps += [a, b]
                        break

            frozen.update(dependencies(gates, i))

        return ",".join(sorted(swaps))
