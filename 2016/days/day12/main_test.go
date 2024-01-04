package day12

import (
	"testing"
)

var input = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`

func TestPart1(t *testing.T) {
	lines := parse(input)
	got := Run(lines, false)
	want := 42
	if got != want {
		t.Errorf("Part1 == %v, want %v", got, want)
	}
}
