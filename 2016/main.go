package main

import (
	"fmt"
	"os"

	"github.com/nanor/advent_of_code/2016/days/day1"
	"github.com/nanor/advent_of_code/2016/days/day2"
	"github.com/nanor/advent_of_code/2016/days/day3"
	"github.com/nanor/advent_of_code/2016/days/day4"
)

func main() {
	day := os.Args[1]
	file, err := os.ReadFile(fmt.Sprintf("./inputs/day%v.txt", day))

	if err != nil {
		panic(err)
	}

	input := string(file)

	switch day {
	case "1":
		day1.Main(input)
	case "2":
		day2.Main(input)
	case "3":
		day3.Main(input)
	case "4":
		day4.Main(input)
	}
}
