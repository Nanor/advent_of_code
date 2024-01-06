package day25

import (
	"fmt"

	"github.com/nanor/advent_of_code/2016/utils/computer"
)

func Main(file string) {
	lines := computer.Parse(file)

	for i := 0; ; i++ {
		init := computer.State{}
		init.Regs[0] = i
		ch := make(chan int)

		go computer.Run(lines, init, ch)

		valid := true
		for i := 0; i < 1000; i++ {
			if <-ch != i%2 {
				valid = false
				break
			}
		}

		if valid {
			fmt.Println(i)
			return
		}
	}

}
