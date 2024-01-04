package day13

import (
	"fmt"
	"math"
	"strconv"

	"github.com/oleiade/lane/v2"
)

type coord struct{ x, y int }

func (c coord) isWall(offset int) bool {
	if c.x < 0 || c.y < 0 {
		return true
	}

	sum := c.x*c.x + 3*c.x + 2*c.x*c.y + c.y + c.y*c.y
	sum += offset

	count := 0

	for sum > 0 {
		if sum%2 == 1 {
			count++
		}
		sum = sum >> 1
	}
	return count%2 == 1
}

func (c coord) add(o coord) coord {
	return coord{c.x + o.x, c.y + o.y}
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

func (c coord) neighbors(offset int) []coord {
	out := make([]coord, 0, 4)

	if x := c.add(coord{0, 1}); !x.isWall(offset) {
		out = append(out, x)
	}
	if x := c.add(coord{0, -1}); !x.isWall(offset) {
		out = append(out, x)
	}
	if x := c.add(coord{1, 0}); !x.isWall(offset) {
		out = append(out, x)
	}
	if x := c.add(coord{-1, 0}); !x.isWall(offset) {
		out = append(out, x)
	}

	return out
}

func Part1(offset int) int {
	start := coord{1, 1}
	end := coord{31, 39}

	queue := lane.NewMinPriorityQueue[coord, int]()
	queue.Push(start, start.dist(end))

	distance := make(map[coord]int)
	distance[start] = 0

	for {
		current, _, ok := queue.Pop()
		if !ok {
			return math.MaxInt
		}

		if current.x == end.x && current.y == end.y {
			return distance[current]
		}

		for _, c := range current.neighbors(offset) {
			dist := distance[current] + 1

			oldDist, exists := distance[c]
			if !exists || dist < oldDist {
				distance[c] = dist

				queue.Push(c, distance[c]+c.dist(end))
			}
		}
	}
}

func Part2(offset int) int {
	start := coord{1, 1}

	queue := lane.NewQueue[coord]()
	queue.Enqueue(start)

	distance := make(map[coord]int)
	distance[start] = 0

	for {
		current, ok := queue.Dequeue()
		if !ok {
			break
		}

		for _, c := range current.neighbors(offset) {
			dist := distance[current] + 1

			oldDist, exists := distance[c]

			if !exists || dist < oldDist {
				distance[c] = dist

				if dist <= 50 {
					queue.Enqueue(c)
				}
			}
		}
	}

	out := 0
	for _, v := range distance {
		if v <= 50 {
			out++
		}
	}

	return out
}

func Main(file string) {
	offset, _ := strconv.Atoi(file)

	fmt.Println(Part1(offset))
	fmt.Println(Part2(offset))
}
