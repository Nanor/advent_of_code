package day15

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func gcd(a, b int) int {
	if a != 0 {
		return gcd(b%a, a)
	}
	return b
}

func lcm(a, b int) int {
	return (a * b) / gcd(a, b)
}

type disc struct{ size, offset int }

func (d disc) at(t int) int {
	return (d.offset + t) % d.size
}

func parse(file string) []disc {
	lines := strings.Split(file, "\n")
	out := make([]disc, 0, len(lines)+1)

	re := regexp.MustCompile(`^Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+).$`)
	for _, line := range strings.Split(file, "\n") {
		ms := re.FindStringSubmatch(line)
		index, _ := strconv.Atoi(ms[1])
		size, _ := strconv.Atoi(ms[2])
		offset, _ := strconv.Atoi(ms[3])
		disc := disc{size, offset + index}
		out = append(out, disc)
	}

	return out
}

func solve(discs []disc) int {
	time := 0
	tick := 1

	for _, disc := range discs {
		for disc.at(time) != 0 {
			time += tick
		}
		tick = lcm(tick, disc.size)
	}

	return time
}

func Main(file string) {
	discs := parse(file)
	fmt.Println(solve(discs))
	discs = append(discs, disc{11, len(discs) + 1})
	fmt.Println(solve(discs))
}
