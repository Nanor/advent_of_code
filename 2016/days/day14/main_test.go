package day14

import (
	"testing"
)

func TestPart1(t *testing.T) {
	got := Part1("abc")
	want := 22728
	if got != want {
		t.Errorf("Part1 == %v, want %v", got, want)
	}
}

func TestPart2(t *testing.T) {
	got := Part2("abc")
	want := 22551
	if got != want {
		t.Errorf("Part2 == %v, want %v", got, want)
	}
}
