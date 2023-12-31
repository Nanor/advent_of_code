package day1

import (
	"testing"
)

func TestPart1(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"R2, L3", "5"},
		{"R2, R2, R2", "2"},
		{"R5, L5, R5, R3", "12"},
	}
	for _, c := range cases {
		steps := Parse(c.in)
		got := Part1(steps)
		if got != c.want {
			t.Errorf("Part1(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}

func TestPart2(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"R8, R4, R4, R8", "4"},
	}
	for _, c := range cases {
		steps := Parse(c.in)
		got := Part2(steps)
		if got != c.want {
			t.Errorf("Part2(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}
