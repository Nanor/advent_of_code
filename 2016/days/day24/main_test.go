package day24

import (
	"testing"
)

var input = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`

func TestPart1(t *testing.T) {
	dists, count := Parse(input)
	got := Part1(dists, count)
	want := 14
	if got != want {
		t.Errorf("Part1 == %v, want %v", got, want)
	}
}
