from aocd import get_data

from src.Grid import Grid


class SearchGrid(Grid):
    def get_line(self, x: int, y: int, dx: int, dy: int, length: int = 4) -> str:
        return "".join((self.get(x + dx * i, y + dy * i) for i in range(length)))


def part1(data: str) -> int:
    grid = SearchGrid(data)

    total = 0

    ds = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1],
    ]

    for x in range(grid.width):
        for y in range(grid.height):
            for dx, dy in ds:
                try:
                    line = grid.get_line(x, y, dx, dy)
                except IndexError:
                    continue
                if line == "XMAS" or line == "SAMX":
                    total += 1

    return total


def part2(data: str) -> int:
    grid = SearchGrid(data)

    total = 0

    for x in range(1, grid.width - 1):
        for y in range(1, grid.height - 1):
            if grid.get(x, y) != "A":
                continue

            pos = grid.get_line(x - 1, y - 1, 1, 1, 3)
            neg = grid.get_line(x + 1, y - 1, -1, 1, 3)

            if (pos == "MAS" or pos == "SAM") and (neg == "MAS" or neg == "SAM"):
                total += 1

    return total


def main() -> None:
    data = get_data(year=2024, day=4)
    print(part1(data))
    print(part2(data))


if __name__ == "__main__":
    main()
