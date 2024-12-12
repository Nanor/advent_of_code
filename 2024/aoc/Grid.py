from typing import Self, Type
from aoc.vec import Vec2


class Grid[T]:
    _data: list[list[T]]
    width: int
    height: int

    def __init__(self, width: int, height: int, data: list[list[T]]) -> None:
        self.height = height
        self.width = width
        self._data = data

    @classmethod
    def with_default(cls, width: int, height: int, default: T) -> Self:
        data = [[default] * width for _ in range(height)]
        return cls(width, height, data)

    def get(self, pos: Vec2):
        if pos.x < 0 or pos.x >= self.width or pos.y < 0 or pos.y >= self.height:
            raise IndexError()

        return self._data[pos.y][pos.x]

    def set(self, pos: Vec2, value: T):
        if pos.x < 0 or pos.x >= self.width or pos.y < 0 or pos.y >= self.height:
            raise IndexError()

        self._data[pos.y][pos.x] = value

    def __repr__(self) -> str:
        return "\n".join(["".join([str(c) for c in l]) for l in self._data])


class StrGrid(Grid[str]):
    @classmethod
    def from_data(cls: Type[Self], data: str):
        lines = [list(l) for l in data.splitlines()]
        height = len(lines)
        width = len(lines[0])

        return cls(width, height, lines)
