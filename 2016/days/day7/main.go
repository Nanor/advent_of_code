package day7

import (
	"fmt"
	"strings"
)

func SupportsTLS(addr string) bool {
	var inside, abbaIn, abbaOut bool

	for i := 0; i < len(addr)-3; i++ {
		if addr[i] == '[' {
			inside = true
			continue
		}
		if addr[i] == ']' {
			inside = false
			continue
		}

		part := addr[i : i+4]

		if part[0] == part[3] && part[1] == part[2] && part[0] != part[1] {
			if inside {
				abbaIn = true
			} else {
				abbaOut = true
			}
		}
	}

	return abbaOut && !abbaIn
}

type pair struct{ a, b byte }

func SupportsSSL(addr string) bool {
	var inside bool

	outsidePairs := make(map[pair]bool)
	insidePairs := make(map[pair]bool)

	for i := 0; i < len(addr)-2; i++ {
		if addr[i] == '[' {
			inside = true
			continue
		}
		if addr[i] == ']' {
			inside = false
			continue
		}

		part := addr[i : i+3]

		if part[0] == part[2] && part[0] != part[1] {
			if inside {
				insidePairs[pair{part[1], part[0]}] = true
			} else {
				outsidePairs[pair{part[0], part[1]}] = true
			}
		}
	}

	for pair := range outsidePairs {
		if insidePairs[pair] {
			return true
		}
	}

	return false
}

func Main(file string) {
	lines := strings.Split(file, "\n")

	var part1, part2 int
	for _, line := range lines {
		if SupportsTLS(line) {
			part1++
		}
		if SupportsSSL(line) {
			part2++
		}
	}

	fmt.Println(part1)
	fmt.Println(part2)

}
