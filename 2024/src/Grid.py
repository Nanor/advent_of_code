class Grid:
    _lines: list[str]
    width: int
    height: int

    def __init__(self, data: str) -> None:
        self._lines = data.split("\n")
        self.height = len(self._lines)
        self.width = len(self._lines[0])

    def get(self, x: int, y: int):
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            raise IndexError()

        return self._lines[y][x]

    def set(self, x: int, y: int, value: str):
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            raise IndexError()

        line = self._lines[y]
        self._lines[y] = line[:x] + value + line[x + 1 :]
