from aocd import get_data
from functools import cmp_to_key


def parse(data: str) -> tuple[list[list[int]], list[list[int]]]:
    [orderings, prints] = data.split("\n\n")

    orderings = [[int(d) for d in l.split("|")] for l in orderings.splitlines()]
    prints = [[int(d) for d in l.split(",")] for l in prints.splitlines()]

    return prints, orderings


def split_valid(prints: list[list[int]], orderings: list[list[int]]):
    valid: list[list[int]] = []
    invalid: list[list[int]] = []

    for pages in prints:
        v = True

        for i, d in enumerate(pages):
            for order in orderings:
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
            valid.append(pages)
        else:
            invalid.append(pages)

    return valid, invalid


def part1(data: str) -> int:
    prints, orderings = parse(data)

    valid, _ = split_valid(prints, orderings)

    total = 0
    for pages in valid:
        total += pages[(len(pages) - 1) // 2]

    return total


def part2(data: str) -> int:
    prints, orderings = parse(data)

    _, invalid = split_valid(prints, orderings)

    total = 0
    for pages in invalid:

        def compare(a: int, b: int) -> int:
            ordering = next(o for o in orderings if a in o and b in o)

            if ordering:
                return 1 if ordering == [a, b] else -1
            return 0

        sorted_pages = sorted(pages, key=cmp_to_key(compare))
        total += sorted_pages[(len(sorted_pages) - 1) // 2]

    return total


def main() -> None:
    data = get_data(year=2024, day=5)
    print(part1(data))
    print(part2(data))


if __name__ == "__main__":
    main()
