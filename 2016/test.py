import itertools
from heapq import heappush, heappop
import re
import sys

def pathTo(node, cameFrom):
    path = [node]
    while node in cameFrom:
        node = cameFrom[node]
        path.append(node)
    return list(reversed(path))

def search(start):
    counter = itertools.count()
    closed = set()
    queue = [(start.heuristic(), next(counter), start)]
    bestCostTo = {start: 0}
    cameFrom = {}

    while len(queue) > 0:
        _, _, node = heappop(queue)

        if node.isGoal():
            return bestCostTo[node], pathTo(node, cameFrom)
        closed.add(node)

        for edgeCost, nextNode in node.neighbors():
            if nextNode in closed:
                continue
            if nextNode.isFailure():
                continue

            nextCost = bestCostTo[node] + edgeCost
            if nextCost >= bestCostTo.get(nextNode, float('inf')):
                continue

            cameFrom[nextNode] = node
            bestCostTo[nextNode] = nextCost
            heappush(queue, 
                    (nextCost + nextNode.heuristic(), next(counter), nextNode))

    return "failure", tuple()

X = 35
Y = 28
nodeBlocked = [[False for x in range(X)] for y in range(Y)]

for line in sys.stdin:
    line = line.strip()
    m = re.findall(r"(\d+)", line)
    if not m:
        continue
    x,y,size,use,avail,p = (int(i) for i in m)
    if size > 120:
        nodeBlocked[y][x] = True
    if p < 10:
        o = (y,x)

def mdist(a,b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

class Node:
    def __init__(self, openNode, goalData):
        self.o = openNode
        self.g = goalData

    def isGoal(self):
        return self.g == (0,0)
    def isFailure(self):
        oy, ox = self.o
        return nodeBlocked[oy][ox]

    def neighbors(self):
        oy, ox = self.o
        for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):
            if ox+dx < 0 or ox+dx >= X or oy+dy < 0 or oy+dy >= Y:
                continue
            if self.g == (oy+dy, ox+dx):
                yield 1, Node(self.g, self.o)
            else:
                yield 1, Node((oy+dy, ox+dx), self.g)

    def heuristic(self):
        return mdist(self.o, self.g) + mdist(self.g, (0,0))

    def __eq__(self, other):
        return self.o == other.o and self.g == other.g
    def __hash__(self):
        return hash((self.o, self.g)) 
    def __repr__(self):
        return str(self.o) + " " + str(self.g)

start = Node(o, (0, 34))
print(search(start)[0])