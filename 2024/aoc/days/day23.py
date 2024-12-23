from networkx import Graph
from networkx.algorithms import enumerate_all_cliques
from aoc.puzzle import Puzzle


class Day23(Puzzle):
    day = 23

    graph: Graph

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.graph = Graph([l.split("-") for l in self.data.splitlines()])

    def part1(self) -> int:
        count = 0

        for clique in enumerate_all_cliques(self.graph):
            if len(clique) == 3 and [n for n in clique if n.startswith("t")]:
                count += 1

        return count

    def part2(self) -> str:
        clique: list[str] = []
        for c in enumerate_all_cliques(self.graph):
            clique = c
        return ",".join(sorted(clique))
