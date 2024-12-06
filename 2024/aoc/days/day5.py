from functools import cmp_to_key

from aoc.puzzle import Puzzle


class Day5(Puzzle):
    day = 5

    prints: list[list[int]]
    orderings: list[list[int]]

    valid: list[list[int]]
    invalid: list[list[int]]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.parse()
        self.split_valid()

    def parse(self) -> None:
        [orderings, prints] = self.data.split("\n\n")

        self.orderings = [
            [int(d) for d in l.split("|")] for l in orderings.splitlines()
        ]
        self.prints = [[int(d) for d in l.split(",")] for l in prints.splitlines()]

    def split_valid(self) -> None:
        self.valid = []
        self.invalid = []

        for pages in self.prints:
            v = True

            for i, d in enumerate(pages):
                for order in self.orderings:
                    if d in order:
                        after = order[1] == d
                        other = order[0 if after else 1]

                        if other in pages and after == (pages.index(other) > i):
                            v = False
                            break
                else:
                    continue
                break

            if v:
                self.valid.append(pages)
            else:
                self.invalid.append(pages)

    def part1(self) -> int:
        total = 0
        for pages in self.valid:
            total += pages[(len(pages) - 1) // 2]

        return total

    def part2(self) -> int:
        total = 0
        for pages in self.invalid:

            def compare(a: int, b: int) -> int:
                ordering = next(o for o in self.orderings if a in o and b in o)

                if ordering:
                    return 1 if ordering == [a, b] else -1
                return 0

            sorted_pages = sorted(pages, key=cmp_to_key(compare))
            total += sorted_pages[(len(sorted_pages) - 1) // 2]

        return total
