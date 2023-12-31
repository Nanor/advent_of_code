package day5

import (
	"testing"
)

func TestPart1(t *testing.T) {
	input := "abc"
	
	got := Part1(input)
	want := "18f47a30"
	if got != want {
		t.Errorf("Part1() == %q, want %q", got, want)
	}
}

func TestPart2(t *testing.T) {
	input := "abc"
	
	got := Part2(input)
	want := "05ace8e3"
	if got != want {
		t.Errorf("Part2() == %q, want %q", got, want)
	}
}
