package day11

import (
	"testing"
)

var input = `The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`

func TestPart1(t *testing.T) {
	got := Part1(input)
	want := 11
	if got != want {
		t.Errorf("Part1 == %v, want %v", got, want)
	}
}
