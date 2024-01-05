package day10

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

type bot struct {
	v1, v2 int

	low, high         int
	lowType, highType bool

	x, y   int
	answer bool
}

func (b *bot) give(v int) *bot {
	if b.v1 > 0 {
		b.v2 = v
	} else {
		b.v1 = v
	}
	return b
}

func (b *bot) values() (int, int) {
	if b.v1 < b.v2 {
		return b.v1, b.v2
	} else {
		return b.v2, b.v1
	}
}

func (b *bot) deal(bots *[]bot, outputs *[]int) {
	if b.v2 > 0 {
		low, high := b.values()
		b.v1, b.v2 = 0, 0
		if b.lowType {
			(*bots)[b.low].give(low).deal(bots, outputs)
		} else {
			(*outputs)[b.low] = low
		}
		if b.highType {
			(*bots)[b.high].give(high).deal(bots, outputs)
		} else {
			(*outputs)[b.high] = high
		}

		if low == b.x && high == b.y {
			b.answer = true
		}
	}
}

func Run(file string, x, y int) ([]bot, []int) {
	bots := make([]bot, 256)
	outputs := make([]int, 30)
	for i := range bots {
		bots[i].x = x
		bots[i].y = y
	}

	lines := strings.Split(file, "\n")

	vRe := regexp.MustCompile(`^value (\d+) goes to bot (\d+)$`)
	dRe := regexp.MustCompile(`^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)`)
	for _, line := range lines {
		if m := vRe.FindStringSubmatch(line); len(m) > 0 {
			val, _ := strconv.Atoi(m[1])
			bot, _ := strconv.Atoi(m[2])
			bots[bot].give(val)
		} else if m := dRe.FindStringSubmatch(line); len(m) > 0 {
			bot, _ := strconv.Atoi(m[1])
			lowType := m[2]
			lowVal, _ := strconv.Atoi(m[3])
			highType := m[4]
			highVal, _ := strconv.Atoi(m[5])
			bots[bot].lowType = lowType == "bot"
			bots[bot].low = lowVal
			bots[bot].highType = highType == "bot"
			bots[bot].high = highVal
		}
	}

	for i := range bots {
		bots[i].deal(&bots, &outputs)
	}

	return bots, outputs
}

func Part1(bots []bot) int {
	for i, b := range bots {
		if b.answer {
			return i
		}
	}

	panic("No answer found")
}

func Part2(outputs []int) int {
	return outputs[0] * outputs[1] * outputs[2]
}

func Main(file string) {
	bots, output := Run(file, 17, 61)

	fmt.Println(Part1(bots))
	fmt.Println(Part2(output))
}
