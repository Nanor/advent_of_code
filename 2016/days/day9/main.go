package day9

import (
	"fmt"
	"regexp"
	"strconv"
)

var re = regexp.MustCompile(`\((\d+)x(\d+)\)`)

func Decompress(str string, nest bool) int {
	out := 0

	for i := 0; i < len(str); i++ {
		if str[i] == '(' {
			ms := re.FindStringSubmatch(str[i:])

			end := len(ms[0])
			a, _ := strconv.Atoi(string(ms[1]))
			b, _ := strconv.Atoi(string(ms[2]))

			if nest {
				out += Decompress(str[i+end:i+end+a], nest) * b
			} else {
				out += a * b
			}
			i += end + a - 1
		} else {
			out++
		}
	}

	return out
}

func Main(file string) {
	fmt.Println(Decompress(file, false))
	fmt.Println(Decompress(file, true))
}
