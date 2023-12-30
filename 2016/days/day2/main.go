package main

import (
	"fmt"
	"os"
)

func Part1(file []byte) {
	x, y := 1, 1

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
			fmt.Print(x + y*3 + 1)
		}

		x = min(max(0, x), 2)
		y = min(max(0, y), 2)
	}

	fmt.Println(x + y*3 + 1)
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

func Part2(file []byte) {
	x, y := 0, 2

	out := make([]byte, 0)

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
			out = append(out, toLetter(x, y))
		}

		sum := nx + ny
		diff := nx - ny
		if diff < 0 {
			diff = -diff
		}

		if sum >= 2 && sum <= 6 && diff <= 2 {
			x, y = nx, ny
		}
	}

	out = append(out, toLetter(x, y))

	fmt.Printf("%s\n", out)
}

func main() {
	file, err := os.ReadFile("./inputs/day2.txt")

	if err != nil {
		panic(err)
	}

	Part1(file)
	Part2(file)
}
