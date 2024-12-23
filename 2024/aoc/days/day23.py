# type: ignore
from igraph import Graph
from aoc.puzzle import Puzzle


class Day23(Puzzle):
    day = 23

    graph: Graph

    def __init__(self, data: str | None = None) -> None:
        super().__init__(data)

        self.graph = Graph()

        v_set: set[str] = set()
        for line in self.data.splitlines():
            [a, b] = line.split("-")
            v_set.add(a)
            v_set.add(b)

        vs: list[str] = list(v_set)
        self.graph.add_vertices(len(vs))
        self.graph.vs["name"] = vs

        for line in self.data.splitlines():
            [a, b] = line.split("-")
            self.graph.add_edges([(vs.index(a), vs.index(b))])

    def part1(self) -> int:
        cliques = self.graph.cliques(3, 3)

        count = 0

        for clique in cliques:
            names: list[str] = self.graph.vs[clique]["name"]
            if [n for n in names if n.startswith("t")]:
                count += 1

        return count

    def part2(self) -> str:
        clique = self.graph.largest_cliques()[0]

        names: list[str] = self.graph.vs[clique]["name"]
        return ",".join(sorted(names))
