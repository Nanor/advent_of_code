package day22

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/oleiade/lane/v2"
)

type coord struct{ x, y int }

type node struct {
	x, y, size, used int
}

type state struct {
	goal, empty coord
}

// Filesystem              Size  Used  Avail  Use%
// /dev/grid/node-x33-y28   86T   71T    15T   82%
var lineRe = regexp.MustCompile(`^/dev/grid/node-x(\d+)-y(\d+)\s*(\d+)T\s*(\d+)T\s*(\d+)T\s*(\d+)%$`)

func parse(file string) map[coord]node {
	lines := strings.Split(file, "\n")
	nodes := make(map[coord]node)

	for _, line := range lines {
		ms := lineRe.FindStringSubmatch(line)
		if len(ms) == 0 {
			continue
		}

		x, _ := strconv.Atoi(ms[1])
		y, _ := strconv.Atoi(ms[2])
		size, _ := strconv.Atoi(ms[3])
		used, _ := strconv.Atoi(ms[4])

		nodes[coord{x, y}] = node{x, y, size, used}
	}

	return nodes
}

func Part1(nodes map[coord]node) int {
	out := 0

	for i, a := range nodes {
		for j, b := range nodes {
			if i == j {
				continue
			}

			if a.used != 0 && a.used < b.size-b.used {
				out++
			}
		}
	}

	return out
}

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

func (s state) neighbours(nodes map[coord]node) []state {
	out := make([]state, 0, 4)

	for i, n := range nodes {
		if i.dist(s.empty) != 1 || n.size > 120 {
			continue
		}

		newGoal := s.goal
		if i == s.goal {
			newGoal = s.empty
		}

		out = append(out, state{newGoal, i})
	}

	return out
}

func Part2(nodes map[coord]node) int {
	var goal, empty coord
	for i := range nodes {
		if i.y == 0 && i.x > goal.x {
			goal = i
		}
		if nodes[i].used == 0 {
			empty = i
		}

	}

	start := state{goal, empty}

	states := lane.NewMinPriorityQueue[state, int]()
	states.Push(start, 0)

	steps := make(map[state]int)
	steps[start] = 0

	for {
		current, _, ok := states.Pop()
		if !ok {
			panic("No solution found")
		}

		if current.goal.x == 0 && current.goal.y == 0 {
			return steps[current]
		}

		for _, s := range current.neighbours(nodes) {
			oldSteps, exists := steps[s]
			if !exists || steps[current]+1 < oldSteps {
				steps[s] = steps[current] + 1
				states.Push(s, steps[s]+s.goal.dist(coord{0, 0}))
			}
		}
	}
}

func Main(file string) {
	nodes := parse(file)
	fmt.Println(Part1(nodes))
	fmt.Println(Part2(nodes))
}
