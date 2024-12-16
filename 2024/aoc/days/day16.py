from collections import defaultdict
from heapq import heappop, heappush
from aoc.grid import StrGrid
from aoc.puzzle import Puzzle
from aoc.vec import Vec2


DIRECTIONS = [Vec2(1, 0), Vec2(0, 1), Vec2(-1, 0), Vec2(0, -1)]


class State(tuple[Vec2, int, int]):
    def __lt__(self, value: tuple[Vec2 | int, ...]) -> bool:
        return isinstance(value[2], int) and self[2] < value[2]


class Day16(Puzzle):
    day = 16

    grid: StrGrid
    start: Vec2
    end: Vec2

    end_states: list[tuple[Vec2, int]]
    costs: dict[tuple[Vec2, int], int]

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.grid = StrGrid.from_data(self.data)
        self.start = self.grid.find("S")
        self.end = self.grid.find("E")

        self.solve()

    def solve(self) -> None:
        open: list[State] = [State((self.start, 0, 0))]

        self.costs = defaultdict(lambda: 999999999)
        final_cost = 999999999

        while len(open):
            (pos, d, cost) = heappop(open)

            if cost > final_cost:
                break

            if pos == self.end:
                final_cost = cost
                self.costs[pos, d] = cost
                continue

            if cost > self.costs[pos, d]:
                continue

            self.costs[pos, d] = cost

            if self.grid.get(pos + DIRECTIONS[d]) != "#":
                heappush(open, State((pos + DIRECTIONS[d], d, cost + 1)))

            heappush(open, State((pos, (d + 1) % 4, cost + 1000)))
            heappush(open, State((pos, (d - 1) % 4, cost + 1000)))

        self.end_states = [
            (self.end, d) for d in range(4) if self.costs[(self.end, d)] == final_cost
        ]

    def part1(self) -> int:
        return self.costs[self.end_states[0]]

    def part2(self) -> int:
        visited: set[Vec2] = set()
        v_open: set[tuple[Vec2, int]] = set(self.end_states)

        while len(v_open):
            (pos, d) = v_open.pop()
            visited.add(pos)

            cost = self.costs[(pos, d)]

            cw_d = (d + 1) % 4
            ccw_d = (d - 1) % 4

            if cost - self.costs[(pos, cw_d)] == 1000:
                v_open.add((pos, cw_d))
            if cost - self.costs[(pos, ccw_d)] == 1000:
                v_open.add((pos, ccw_d))

            if cost - self.costs[(pos - DIRECTIONS[d], d)] == 1:
                v_open.add((pos - DIRECTIONS[d], d))

        return len(visited)
