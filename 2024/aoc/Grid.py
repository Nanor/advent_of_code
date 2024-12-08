class Grid:
    _lines: list[list[str]]
    width: int
    height: int

    def __init__(self, data: str) -> None:
        self._lines = [list(l) for l in data.splitlines()]
        self.height = len(self._lines)
        self.width = len(self._lines[0])

    def get(self, x: int, y: int):
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            raise IndexError()

        return self._lines[y][x]

    def set(self, x: int, y: int, value: str):
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            raise IndexError()

        self._lines[y][x] = value

    def __repr__(self) -> str:
        return "\n".join(["".join(l) for l in self._lines])
