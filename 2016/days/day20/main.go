package day20

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

type Range struct{ start, end int }

func parse(file string) []Range {
	lines := strings.Split(file, "\n")
	ranges := make([]Range, 0, len(lines))
	for _, line := range lines {
		ns := strings.Split(line, "-")
		start, _ := strconv.Atoi(ns[0])
		end, _ := strconv.Atoi(ns[1])
		ranges = append(ranges, Range{start, end})
	}

	return ranges
}

func nextFree(ranges []Range, start int) int {
	addr := start
	changed := true
	for changed {
		changed = false

		for _, r := range ranges {
			if addr >= r.start && addr <= r.end {
				addr = r.end + 1
				changed = true
			}
		}
	}

	return addr
}

func Part1(ranges []Range) int {
	return nextFree(ranges, 0)
}

func Part2(ranges []Range) int {
	count := 0
	addr := 0

	for addr < math.MaxUint32 {
		addr = nextFree(ranges, addr)

		if addr < math.MaxUint32 {
			count++
		}
		addr++
	}

	return count
}

func Main(file string) {
	ranges := parse(file)
	fmt.Println(Part1(ranges))
	fmt.Println(Part2(ranges))
}
