from aocd import get_data


def sign(a: int, b: int) -> int:
    if a == b:
        return 0
    return 1 if a > b else -1


def parse(data: str) -> list[list[int]]:
    return [[int(d) for d in l.split(" ")] for l in data.split("\n") if len(l.strip())]


def is_valid(levels: list[int]) -> bool:
    direction = sign(levels[0], levels[1])
    for v in range(1, len(levels)):
        diff = abs(levels[v] - levels[v - 1])
        if sign(levels[v - 1], levels[v]) != direction or diff < 1 or diff > 3:
            return False

    return True


def part1(data: str) -> int:
    reports = parse(data)

    total = 0
    for report in reports:
        if is_valid(report):
            total += 1

    return total


def part2(data: str) -> int:
    reports = parse(data)

    total = 0
    for report in reports:
        if is_valid(report):
            total += 1
            continue

        for i in range(0, len(report)):
            levels = report[:i] + report[i + 1 :]
            if is_valid(levels):
                total += 1
                break

    return total


def main() -> None:
    data = get_data(year=2024, day=2)
    print(part1(data))
    print(part2(data))


if __name__ == "__main__":
    main()
