package main

import (
	"fmt"
	"os"

	"github.com/nanor/advent_of_code/2016/days/day1"
	"github.com/nanor/advent_of_code/2016/days/day10"
	"github.com/nanor/advent_of_code/2016/days/day11"
	"github.com/nanor/advent_of_code/2016/days/day12"
	"github.com/nanor/advent_of_code/2016/days/day13"
	"github.com/nanor/advent_of_code/2016/days/day14"
	"github.com/nanor/advent_of_code/2016/days/day15"
	"github.com/nanor/advent_of_code/2016/days/day16"
	"github.com/nanor/advent_of_code/2016/days/day17"
	"github.com/nanor/advent_of_code/2016/days/day18"
	"github.com/nanor/advent_of_code/2016/days/day19"
	"github.com/nanor/advent_of_code/2016/days/day2"
	"github.com/nanor/advent_of_code/2016/days/day3"
	"github.com/nanor/advent_of_code/2016/days/day4"
	"github.com/nanor/advent_of_code/2016/days/day5"
	"github.com/nanor/advent_of_code/2016/days/day6"
	"github.com/nanor/advent_of_code/2016/days/day7"
	"github.com/nanor/advent_of_code/2016/days/day8"
	"github.com/nanor/advent_of_code/2016/days/day9"
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
	case "5":
		day5.Main(input)
	case "6":
		day6.Main(input)
	case "7":
		day7.Main(input)
	case "8":
		day8.Main(input)
	case "9":
		day9.Main(input)
	case "10":
		day10.Main(input)
	case "11":
		day11.Main(input)
	case "12":
		day12.Main(input)
	case "13":
		day13.Main(input)
	case "14":
		day14.Main(input)
	case "15":
		day15.Main(input)
	case "16":
		day16.Main(input)
	case "17":
		day17.Main(input)
	case "18":
		day18.Main(input)
	case "19":
		day19.Main(input)
	}
}
