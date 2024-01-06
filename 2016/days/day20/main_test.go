package day20

import (
	"testing"
)

var input = `5-8
0-2
4-7`

func TestPart1(t *testing.T) {
	got := Part1(parse(input))
	want := 3
	if got != want {
		t.Errorf("Part1 == %v, want %v", got, want)
	}
}
