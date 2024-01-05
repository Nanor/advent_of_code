package day19

import (
	"testing"
)

func TestPart1(t *testing.T) {
	cases := []struct {
		in, want int
	}{
		{5, 3},
	}
	for _, c := range cases {
		got := Part1(c.in)
		if got != c.want {
			t.Errorf("Part1(%v) == %v, want %v", c.in, got, c.want)
		}
	}
}

func TestPart2(t *testing.T) {
	cases := []struct {
		in, want int
	}{
		{5, 2},
		{10, 1},
		{11, 2},
		{15, 6},
		{20, 13},
		{21, 15},
	}
	for _, c := range cases {
		got := Part2(c.in)
		if got != c.want {
			t.Errorf("Part2(%v) == %v, want %v", c.in, got, c.want)
		}
	}
}
