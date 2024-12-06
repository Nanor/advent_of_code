from abc import ABC, abstractmethod

from aocd import get_data


class Puzzle(ABC):
    year: int = 2024
    day: int

    data: str

    def __init__(self, data: str | None = None) -> None:
        super().__init__()

        if data:
            self.data = data
        else:
            self.data = get_data(year=self.year, day=self.day)

    @abstractmethod
    def part1(self) -> str | int: ...

    @abstractmethod
    def part2(self) -> str | int: ...
