package day1

import (
	"fmt"

	"github.com/nanor/advent_of_code/2016/utils"
)

type Step struct {
	dir rune
	len int
}

type Coord struct {
	x int
	y int
}

func Parse(file string) []Step {
	steps := make([]Step, 0)

	var dir rune
	var len int

	for _, b := range file {
		switch b {
		case 'L', 'R':
			dir = b
		case ' ':
			continue
		case ',':
			steps = append(steps, Step{dir, len})
			dir = 0
			len = 0
		default:
			len = len*10 + int(b-'0')
		}
	}
	steps = append(steps, Step{dir, len})

	return steps
}

func Part1(steps []Step) string {
	var dir, x, y int

	for _, s := range steps {
		d := 1
		if s.dir == 76 {
			d = -1
		}
		dir = (dir + d + 4) % 4

		switch dir {
		case 0:
			y += s.len
		case 1:
			x += s.len
		case 2:
			y -= s.len
		case 3:
			x -= s.len
		}

	}

	return fmt.Sprint(utils.Abs(x) + utils.Abs(y))
}

func Part2(steps []Step) string {
	var dir, x, y int

	visited := make(map[Coord]bool)

	for _, s := range steps {
		d := 1
		if s.dir == 76 {
			d = -1
		}
		dir = (dir + d + 4) % 4

		var dx, dy int

		switch dir {
		case 0:
			dy = 1
		case 1:
			dx = 1
		case 2:
			dy = -1
		case 3:
			dx = -1
		}

		for i := 0; i < s.len; i++ {
			if visited[Coord{x, y}] {
				return fmt.Sprint(utils.Abs(x) + utils.Abs(y))
			}
			visited[Coord{x, y}] = true
			x += dx
			y += dy
		}
	}

	return ""
}

func Main(file string) {
	parsed := Parse(file)
	fmt.Println(Part1(parsed))
	fmt.Println(Part2(parsed))
}
