package day23

import (
	"fmt"

	"github.com/nanor/advent_of_code/2016/utils/computer"
)

func factorial(x int) int {
	if x == 1 {
		return 1
	}
	return x * factorial(x-1)
}

func Main(file string) {
	lines := computer.Parse(file)

	init := computer.State{}
	init.Regs[0] = 7

	newState := computer.Run(lines, init)
	total := newState.Regs[0]

	fmt.Println(total)

	offset := total - factorial(7)
	fmt.Println(offset + factorial(12))
}
