from dataclasses import dataclass
from typing import Self


@dataclass
class Vec2:
    x: int
    y: int

    def __repr__(self) -> str:
        return f"({self.x}, {self.y})"

    def __hash__(self) -> int:
        return (self.x, self.y).__hash__()

    def __add__(self, other: Self) -> Self:
        return self.__class__(self.x + other.x, self.y + other.y)

    def __mul__(self, other: int) -> Self:
        return self.__class__(self.x * other, self.y * other)

    def __rmul__(self, other: int) -> Self:
        return self * other

    def __neg__(self) -> Self:
        return self * -1

    def __sub__(self, other: Self) -> Self:
        return self + (-other)
