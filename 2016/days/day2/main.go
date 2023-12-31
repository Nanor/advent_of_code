package day2

import (
	"fmt"

	utils "github.com/nanor/advent_of_code/2016/utils"
)

func Part1(file string) string {
	x, y := 1, 1

	out := ""

	for _, c := range file {
		switch c {
		case 'U':
			y -= 1
		case 'D':
			y += 1
		case 'L':
			x -= 1
		case 'R':
			x += 1
		case '\n':
			out += fmt.Sprint(x + y*3 + 1)
		}

		x = min(max(0, x), 2)
		y = min(max(0, y), 2)
	}

	out += fmt.Sprint(x + y*3 + 1)
	return out
}

func toLetter(x, y int) byte {
	//		1
	//	  2 3 4
	//  5 6 7 8 9
	//	  A B C
	//	    D

	if y == 0 {
		return '1'
	}
	if y == 1 {
		return '1' + uint8(x)
	}
	if y == 2 {
		return '5' + uint8(x)
	}
	if y == 3 {
		return 'A' - 1 + uint8(x)
	}
	return 'D'
}

func Part2(file string) string {
	x, y := 0, 2

	out := ""

	for _, c := range file {
		nx, ny := x, y
		switch c {
		case 'U':
			ny -= 1
		case 'D':
			ny += 1
		case 'L':
			nx -= 1
		case 'R':
			nx += 1
		case '\n':
			out += string(toLetter(x, y))
		}

		sum := nx + ny
		diff := utils.Abs(nx - ny)

		if sum >= 2 && sum <= 6 && diff <= 2 {
			x, y = nx, ny
		}
	}

	out += string(toLetter(x, y))

	return out
}

func Main(file string) {
	fmt.Println(Part1(file))
	fmt.Println(Part2(file))
}
