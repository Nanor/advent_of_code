package day6

import (
	"testing"
)

var input = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`

func TestSolve(t *testing.T) {
	got1, got2 := Solve(input)
	want1, want2 := "easter", "advent"
	if got1 != want1 {
		t.Errorf("Part1 == %q, want %q", got1, want1)
	}
	if got2 != want2 {
		t.Errorf("Part2 == %q, want %q", got2, want2)
	}
}
