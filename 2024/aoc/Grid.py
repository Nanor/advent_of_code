from aoc.vec import Vec2


class Grid:
    _lines: list[list[str]]
    width: int
    height: int

    def __init__(self, data: str) -> None:
        self._lines = [list(l) for l in data.splitlines()]
        self.height = len(self._lines)
        self.width = len(self._lines[0])

    def get(self, pos: Vec2):
        if pos.x < 0 or pos.x >= self.width or pos.y < 0 or pos.y >= self.height:
            raise IndexError()

        return self._lines[pos.y][pos.x]

    def set(self, pos: Vec2, value: str):
        if pos.x < 0 or pos.x >= self.width or pos.y < 0 or pos.y >= self.height:
            raise IndexError()

        self._lines[pos.y][pos.x] = value

    def __repr__(self) -> str:
        return "\n".join(["".join(l) for l in self._lines])
