from itertools import islice
from typing import Generator, NoReturn

from aoc.puzzle import Puzzle


def monkey_gen(secret: int) -> Generator[int, None, NoReturn]:
    n = secret
    while True:
        n ^= n << 6
        n &= 16777215
        n ^= n >> 5
        n &= 16777215
        n ^= n << 11
        n &= 16777215

        yield n


class Monkey:
    secrets: list[int]
    prices: list[int]
    price_diffs: list[int]

    results: dict[tuple[int, ...], int]

    def __init__(self, secret: int):
        gen = monkey_gen(secret)
        self.secrets = list(islice(gen, 2000))
        self.prices = [s % 10 for s in self.secrets]
        self.price_diffs = [self.prices[i] - self.prices[i - 1] for i in range(2000)]

        self.results = {}
        for i in range(2000 - 4, 0, -1):
            self.results[tuple(self.price_diffs[i : i + 4])] = self.prices[i + 3]


class Day22(Puzzle):
    day = 22

    monkeys: list[Monkey]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.monkeys = [Monkey(int(s)) for s in self.data.splitlines()]

    def part1(self) -> int:
        return sum(m.secrets[-1] for m in self.monkeys)

    def try_sequence(self, sequence: tuple[int, ...]) -> int:
        total = 0
        for monkey in self.monkeys:
            try:
                total += monkey.results[sequence]
            except KeyError:
                pass
        return total

    def part2(self) -> int:
        best = 0

        seqs: set[tuple[int, ...]] = set()
        for m in self.monkeys:
            for i in range(1, 2000 - 5):
                seq = m.price_diffs[i : i + 4]

                if m.prices[i + 3] == 9:
                    seqs.add(tuple(seq))

        for sequence in seqs:
            bananas = self.try_sequence(sequence)
            best = max(best, bananas)

        return best
