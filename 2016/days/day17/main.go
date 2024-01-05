package day17

import (
	"crypto/md5"
	"fmt"

	"github.com/oleiade/lane/v2"
)

type state struct {
	x, y int
	path string
}

func (s state) neighbors() []state {
	out := make([]state, 0, 4)

	h := md5.New()
	h.Write([]byte(s.path))
	hash := h.Sum(nil)

	if hash[0]>>4 > 10 && s.y > 0 {
		out = append(out, state{s.x, s.y - 1, s.path + "U"})
	}
	if hash[0]%16 > 10 && s.y < 3 {
		out = append(out, state{s.x, s.y + 1, s.path + "D"})
	}
	if hash[1]>>4 > 10 && s.x > 0 {
		out = append(out, state{s.x - 1, s.y, s.path + "L"})
	}
	if hash[1]%16 > 10 && s.x < 3 {
		out = append(out, state{s.x + 1, s.y, s.path + "R"})
	}

	return out
}

func Part1(passcode string) string {
	start := state{0, 0, passcode}

	queue := lane.NewMinPriorityQueue[state, int]()
	queue.Push(start, len(start.path))

	for {
		current, _, ok := queue.Pop()
		if !ok {
			return ""
		}

		if current.x == 3 && current.y == 3 {
			return current.path[len(passcode):]
		}

		for _, c := range current.neighbors() {
			queue.Push(c, len(c.path))
		}
	}
}

func Part2(passcode string) int {
	start := state{0, 0, passcode}

	queue := lane.NewMinPriorityQueue[state, int]()
	queue.Push(start, len(start.path))

	maxPath := 0

	for {
		current, _, ok := queue.Pop()
		if !ok {
			break
		}

		if current.x == 3 && current.y == 3 {
			maxPath = max(maxPath, len(current.path)-len(passcode))
			continue
		}

		for _, c := range current.neighbors() {
			queue.Push(c, len(c.path))
		}
	}

	return maxPath
}

func Main(file string) {
	fmt.Println(Part1(file))
	fmt.Println(Part2(file))
}
