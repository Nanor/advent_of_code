package day3

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

type Tri struct {
	a, b, c int
}

func Parse(file string) []Tri {
	out := make([]Tri, 0)

	lines := strings.Split(file, "\n")

	re := regexp.MustCompile(`^\s*(\d+)\s*(\d+)\s*(\d+)$`)
	for _, line := range lines {
		matches := re.FindSubmatch([]byte(line))[1:]

		a, _ := strconv.Atoi(string(matches[0]))
		b, _ := strconv.Atoi(string(matches[1]))
		c, _ := strconv.Atoi(string(matches[2]))

		out = append(out, Tri{a, b, c})
	}

	return out
}

func Part1(tris []Tri) string {
	var count uint

	for _, tri := range tris {
		if tri.a+tri.b > tri.c &&
			tri.a+tri.c > tri.b &&
			tri.b+tri.c > tri.a {
			count++
		}
	}

	return fmt.Sprint(count)
}

func Part2(tris []Tri) string {

	colTris := make([]Tri, 0)

	for i := 0; i < len(tris); i += 3 {
		colTris = append(colTris, Tri{tris[i].a, tris[i+1].a, tris[i+2].a})
		colTris = append(colTris, Tri{tris[i].b, tris[i+1].b, tris[i+2].b})
		colTris = append(colTris, Tri{tris[i].c, tris[i+1].c, tris[i+2].c})
	}

	var count uint

	for _, tri := range colTris {
		if tri.a+tri.b > tri.c &&
			tri.a+tri.c > tri.b &&
			tri.b+tri.c > tri.a {
			count++
		}
	}

	return fmt.Sprint(count)
}

func Main(file string) {
	parsed := Parse(file)
	fmt.Println(Part1(parsed))
	fmt.Println(Part2(parsed))
}
