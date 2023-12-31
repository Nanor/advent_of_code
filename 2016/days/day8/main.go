package day8

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

type coord struct{ x, y int }
type screen map[coord]bool

const WIDTH = 50
const HEIGHT = 6

func (s *screen) rect(w, h int) {
	for x := 0; x < w; x++ {
		for y := 0; y < h; y++ {
			(*s)[coord{x, y}] = true
		}
	}
}

func (s *screen) row(y, d int) {
	row := make([]bool, WIDTH, WIDTH)
	for x := 0; x < WIDTH; x++ {
		row[x] = (*s)[coord{x, y}]
	}

	for x := 0; x < WIDTH; x++ {
		(*s)[coord{x, y}] = row[(x-d+WIDTH)%WIDTH]
	}
}

func (s *screen) col(x, d int) {
	col := make([]bool, HEIGHT, HEIGHT)
	for y := 0; y < HEIGHT; y++ {
		col[y] = (*s)[coord{x, y}]
	}

	for y := 0; y < HEIGHT; y++ {
		(*s)[coord{x, y}] = col[(y-d+HEIGHT)%HEIGHT]
	}
}

func Main(file string) {
	reRect := regexp.MustCompile(`^rect (\d+)x(\d+)$`)
	reRow := regexp.MustCompile(`^rotate row y=(\d+) by (\d+)$`)
	reCol := regexp.MustCompile(`^rotate column x=(\d+) by (\d+)$`)

	screen := make(screen)

	for _, v := range strings.Split(file, "\n") {
		bs := []byte(v)

		if ms := reRect.FindSubmatch(bs); len(ms) > 0 {
			w, _ := strconv.Atoi(string(ms[1]))
			h, _ := strconv.Atoi(string(ms[2]))
			screen.rect(w, h)
		}
		if ms := reRow.FindSubmatch(bs); len(ms) > 0 {
			y, _ := strconv.Atoi(string(ms[1]))
			d, _ := strconv.Atoi(string(ms[2]))
			screen.row(y, d)
		}
		if ms := reCol.FindSubmatch(bs); len(ms) > 0 {
			x, _ := strconv.Atoi(string(ms[1]))
			d, _ := strconv.Atoi(string(ms[2]))
			screen.col(x, d)
		}

	}

	count := 0
	for y := 0; y < HEIGHT; y++ {
		for x := 0; x < WIDTH; x++ {
			if screen[coord{x, y}] {
				count++
			}
		}
	}
	fmt.Println(count)

	out := ""
	for y := 0; y < HEIGHT; y++ {
		for x := 0; x < WIDTH; x++ {
			if screen[coord{x, y}] {
				out += "#"
			} else {
				out += " "
			}
		}
		out += "\n"
	}
	fmt.Println(out)
}
