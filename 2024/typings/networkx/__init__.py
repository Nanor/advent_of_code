class Graph:
    def __init__(self, edges: list[list[str]]) -> None: ...
    def add_node(self, node: str) -> None: ...
    def add_edge(self, a: str, b: str) -> None: ...
    def add_edges_from(self, edges: list[list[str]]) -> None: ...
