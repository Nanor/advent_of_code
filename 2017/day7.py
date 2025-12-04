#!/usr/local/bin/python3
import re
from collections import defaultdict


class Program:
    def __init__(self, name, weight, children, programs):
        self.name = name
        programs[name] = self
        self.weight = weight
        self._children = children
        self._programs = programs

    def children(self):
        return [self._programs[child_name] for child_name in self._children]

    def stack_weight(self):
        try:
            return self._stack_weight
        except AttributeError:
            self._stack_weight = self.weight + sum(child.stack_weight() for child in self.children())
            return self._stack_weight


def find_root(programs):
    possible = list(programs.keys())

    for program in programs.values():
        for child in program.children():
            possible.remove(child.name)

    return programs[possible[0]]


def part2(root):
    nodes = [root]
    unbalanced = []

    while nodes:
        node = nodes[0]
        nodes = nodes[1:]

        child_weights = [child.stack_weight() for child in node.children()]

        if len(set(child_weights)) > 1:
            unbalanced.append(node)

        for child in node.children():
            nodes.append(child)

    node = unbalanced[-1]

    child_weights = [child.stack_weight() for child in node.children()]
    counts = defaultdict(lambda: 0)
    for w in child_weights:
        counts[w] += 1

    for w in counts:
        if counts[w] == 1:
            wrong = child_weights.index(w)
        else:
            right = child_weights.index(w)

    return node.children()[wrong].weight + child_weights[right] - child_weights[wrong]


def main():
    with open("../files/2017_07_input.txt") as f:
        programs = {}
        for line in f:
            name = line.split(" ")[0]
            weight = int(re.search("\((\d+)\)", line).group(1))
            if "->" in line:
                children = [child.strip() for child in line.split("->")[1].split(",")]
            else:
                children = []
            Program(name, weight, children, programs)

    root = find_root(programs)

    # part1
    print(root.name)

    # part2
    print(part2(root))


if __name__ == "__main__":
    main()
