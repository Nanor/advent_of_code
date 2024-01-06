package day12

import (
	"fmt"
	"github.com/nanor/advent_of_code/2016/utils/computer"
)

func Main(file string) {
	lines := computer.Parse(file)

	init := computer.State{}
	newState := computer.Run(lines, init)
	fmt.Println(newState.Regs[0])

	init.Regs[2] = 1
	newState = computer.Run(lines, init)
	fmt.Println(newState.Regs[0])
}
