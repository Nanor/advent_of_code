package day21

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

var swapPosRe = regexp.MustCompile(`^swap position (\d+) with position (\d+)$`)
var swapLetterRe = regexp.MustCompile(`^swap letter (\w) with letter (\w)$`)
var rotateRe = regexp.MustCompile(`^rotate (left|right) (\d+) steps?$`)
var rotateLetterRe = regexp.MustCompile(`^rotate based on position of letter (\w)$`)
var reverseRe = regexp.MustCompile(`^reverse positions (\d+) through (\d+)$`)
var moveRe = regexp.MustCompile(`^move position (\d+) to position (\d+)$`)

func indexOf(bs []byte, b byte) int {
	for i, x := range bs {
		if x == b {
			return i
		}
	}
	panic("Not found in string")
}

func reverseString(str []byte) {
	for i := 0; i < len(str)/2; i++ {
		str[i], str[len(str)-1-i] = str[len(str)-1-i], str[i]
	}
}

func rotateString(str []byte, a int) []byte {
	newS := make([]byte, len(str))
	for i := range str {
		newS[i] = str[(((i-a)%len(str))+len(str))%len(str)]
	}
	return newS
}

func Part1(file string, start string) string {
	curr := []byte(start)

	for _, line := range strings.Split(file, "\n") {
		if ms := swapPosRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[1])
			b, _ := strconv.Atoi(ms[2])
			curr[a], curr[b] = curr[b], curr[a]
		}
		if ms := swapLetterRe.FindStringSubmatch(line); len(ms) > 0 {
			a := indexOf(curr, ms[1][0])
			b := indexOf(curr, ms[2][0])
			curr[a], curr[b] = curr[b], curr[a]
		}
		if ms := reverseRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[1])
			b, _ := strconv.Atoi(ms[2])
			reverseString(curr[a : b+1])
		}
		if ms := rotateRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[2])
			if ms[1] == "left" {
				a = -a
			}
			curr = rotateString(curr, a)
		}
		if ms := moveRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[1])
			b, _ := strconv.Atoi(ms[2])
			l := curr[a]
			newS := make([]byte, 0, len(curr)-1)
			newS = append(newS, curr[:a]...)
			newS = append(newS, curr[a+1:]...)

			newS2 := make([]byte, 0, len(curr))
			newS2 = append(newS2, newS[:b]...)
			newS2 = append(newS2, l)
			newS2 = append(newS2, newS[b:]...)

			curr = newS2
		}
		if ms := rotateLetterRe.FindStringSubmatch(line); len(ms) > 0 {
			a := indexOf(curr, ms[1][0])
			if a >= 4 {
				a++
			}
			a++

			curr = rotateString(curr, a)
		}
	}
	return string(curr)
}

func Part2(file string, start string) string {
	curr := []byte(start)

	lines := strings.Split(file, "\n")
	for i := len(lines) - 1; i >= 0; i-- {
		line := lines[i]
		if ms := swapPosRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[1])
			b, _ := strconv.Atoi(ms[2])
			curr[a], curr[b] = curr[b], curr[a]
		}
		if ms := swapLetterRe.FindStringSubmatch(line); len(ms) > 0 {
			a := indexOf(curr, ms[1][0])
			b := indexOf(curr, ms[2][0])
			curr[a], curr[b] = curr[b], curr[a]
		}
		if ms := reverseRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[1])
			b, _ := strconv.Atoi(ms[2])
			reverseString(curr[a : b+1])
		}
		if ms := rotateRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[2])
			if ms[1] == "right" {
				a = -a
			}
			curr = rotateString(curr, a)
		}
		if ms := moveRe.FindStringSubmatch(line); len(ms) > 0 {
			a, _ := strconv.Atoi(ms[2])
			b, _ := strconv.Atoi(ms[1])
			l := curr[a]
			newS := make([]byte, 0, len(curr)-1)
			newS = append(newS, curr[:a]...)
			newS = append(newS, curr[a+1:]...)

			newS2 := make([]byte, 0, len(curr))
			newS2 = append(newS2, newS[:b]...)
			newS2 = append(newS2, l)
			newS2 = append(newS2, newS[b:]...)

			curr = newS2
		}
		if ms := rotateLetterRe.FindStringSubmatch(line); len(ms) > 0 {

			for i := 0; i < len(curr)+2; i++ {
				test := rotateString(curr, -i)

				a := indexOf(test, ms[1][0])
				if a >= 4 {
					a++
				}
				a++

				if a == i {
					curr = test
					break
				}
			}

		}
	}
	return string(curr)
}

func Main(file string) {
	fmt.Println(Part1(file, "abcdefgh"))
	fmt.Println(Part2(file, "fbgdceah"))
}
