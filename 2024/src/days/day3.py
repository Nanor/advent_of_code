from aocd import get_data
import re


def part1(data: str) -> int:
    regex = re.compile(r"mul\((\d+),(\d+)\)")

    total = 0
    for x, y in regex.findall(data):
        total += int(x) * int(y)

    return total


def part2(data: str) -> int:
    regex = re.compile(r"mul\((\d+),(\d+)\)|(do\(\))|(don't\(\))")

    total = 0
    enabled: bool = True
    for x, y, e, d in regex.findall(data):
        if e:
            enabled = True
        elif d:
            enabled = False
        elif enabled:
            total += int(x) * int(y)

    return total
 

def main() -> None:
    data = get_data(year=2024, day=3)
    print(part1(data))
    print(part2(data))


if __name__ == "__main__":
    main()
