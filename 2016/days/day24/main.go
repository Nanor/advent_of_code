package day24

import (
	"fmt"
	"math"
	"strings"

	"github.com/oleiade/lane/v2"
)

type coord struct{ x, y int }
type pair struct{ a, b int }

func (c coord) dist(o coord) int {
	x := c.x - o.x
	if x < 0 {
		x = -x
	}
	y := c.y - o.y
	if y < 0 {
		y = -y
	}
	return x + y
}

func (c coord) neighbours(grid map[coord]bool) []coord {
	out := make([]coord, 0, 4)

	if u := (coord{c.x, c.y - 1}); !grid[u] {
		out = append(out, u)
	}
	if d := (coord{c.x, c.y + 1}); !grid[d] {
		out = append(out, d)
	}
	if l := (coord{c.x - 1, c.y}); !grid[l] {
		out = append(out, l)
	}
	if r := (coord{c.x + 1, c.y}); !grid[r] {
		out = append(out, r)
	}

	return out
}

func path(grid map[coord]bool, start, end coord) int {
	states := lane.NewMinPriorityQueue[coord, int]()
	states.Push(start, 0)

	steps := make(map[coord]int)
	steps[start] = 0

	for {
		current, _, ok := states.Pop()
		if !ok {
			panic("No solution found")
		}

		if current == end {
			return steps[current]
		}

		for _, s := range current.neighbours(grid) {
			oldSteps, exists := steps[s]
			if !exists || steps[current]+1 < oldSteps {
				steps[s] = steps[current] + 1
				states.Push(s, steps[s]+s.dist(end))
			}
		}
	}
}

func solve(dists map[pair]int, left, nodes, curr int, loop bool) int {
	left = left & ^(1 << curr)

	if left == 0 {
		if loop {
			return dists[pair{curr, 0}]
		}
		return 0
	}

	out := math.MaxInt

	for i := 0; i < nodes; i++ {
		if left&(1<<i) > 0 {
			out = min(out, dists[pair{curr, i}]+solve(dists, left, nodes, i, loop))
		}
	}

	return out
}

func Parse(file string) (map[pair]int, int) {
	lines := strings.Split(file, "\n")
	maxX, maxY := len(lines[0]), len(lines)

	grid := make(map[coord]bool)
	nodes := make([]coord, 10)

	maxNode := 0

	for x := 0; x < maxX; x++ {
		for y := 0; y < maxY; y++ {
			c := coord{x, y}
			char := lines[y][x]
			grid[c] = char == '#'

			if char != '#' && char != '.' {
				v := int(char - '0')
				nodes[v] = c
				maxNode = max(maxNode, int(v))
			}
		}
	}
	nodes = nodes[:maxNode+1]

	dists := make(map[pair]int)

	for i := 0; i < len(nodes); i++ {
		for j := i; j < len(nodes); j++ {
			dist := path(grid, nodes[i], nodes[j])
			dists[pair{i, j}] = dist
			dists[pair{j, i}] = dist
		}
	}

	return dists, len(nodes)
}

func Part1(dists map[pair]int, count int) int {
	return solve(dists, (1<<count)-1, count, 0, false)
}

func Part2(dists map[pair]int, count int) int {
	return solve(dists, (1<<count)-1, count, 0, true)
}

func Main(file string) {
	dists, count := Parse(file)
	fmt.Println(Part1(dists, count))
	fmt.Println(Part2(dists, count))
}
