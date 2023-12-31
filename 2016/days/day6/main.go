package day6

import (
	"fmt"
	"math"
	"strings"
)

func Solve(file string) (string, string) {
	lines := strings.Split(file, "\n")

	length := len(lines[0])
	min := make([]byte, 0, length)
	max := make([]byte, 0, length)

	for i := 0; i < length; i++ {
		counts := make(map[byte]int)

		for _, line := range lines {
			counts[line[i]]++
		}

		var mi, ma byte
		minCount := math.MaxInt
		maxCount := 0
		for b, c := range counts {
			if c < minCount {
				mi, minCount = b, c
			}
			if c > maxCount {
				ma, maxCount = b, c
			}
		}
		min = append(min, mi)
		max = append(max, ma)
	}

	return string(max), string(min)
}

func Main(file string) {
	max, min := Solve(file)
	fmt.Println(max)
	fmt.Println(min)
}
