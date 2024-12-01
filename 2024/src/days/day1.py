from aocd import get_data
import re


def parse(data: str) -> tuple[list[int], list[int]]:
    (left, right) = zip(*[re.split(r"\s+", line) for line in data.split("\n")])

    left = [int(l) for l in left]
    right = [int(r) for r in right]

    return left, right


def part1(data: str) -> int:
    (left, right) = parse(data)

    left.sort()
    right.sort()

    return sum(abs(a - b) for (a, b) in zip(left, right))


def part2(data: str) -> int:
    (left, right) = parse(data)

    return sum(n * left.count(n) * right.count(n) for n in {*left, *right})


def main() -> None:
    data = get_data(year=2024, day=1)
    print(part1(data))
    print(part2(data))


if __name__ == "__main__":
    main()
