package day18

import (
	"fmt"
)

func next(line string) string {
	out := make([]byte, 0, len(line))

	line = "." + line + "."

	for i := 1; i < len(line)-1; i++ {
		sample := line[i-1 : i+2]

		if sample == "^^." || sample == ".^^" || sample == "^.." || sample == "..^" {
			out = append(out, '^')
		} else {
			out = append(out, '.')
		}
	}

	return string(out)
}

func solve(line string, lines int) int {
	count := 0

	for i := 0; i < lines; i++ {
		for _, b := range line {
			if b == '.' {
				count++
			}
		}
		line = next(line)
	}

	return count
}

func Main(file string) {
	fmt.Println(solve(file, 40))
	fmt.Println(solve(file, 400000))
}
