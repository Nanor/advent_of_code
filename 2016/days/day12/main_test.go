package day12

import (
	"testing"

	"github.com/nanor/advent_of_code/2016/utils/computer"
)

var input = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`

func TestPart1(t *testing.T) {
	lines := computer.Parse(input)
	init := computer.State{}
	got := computer.Run(lines, init)
	want := 42
	if got.Regs[0] != want {
		t.Errorf("Part1 == %v, want %v", got, want)
	}
}
