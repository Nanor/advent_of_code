package day17

import (
	"testing"
)

func TestPart1(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"ihgpwlah", "DDRRRD"},
		{"kglvqrro", "DDUDRLRRUDRD"},
		{"ulqzkmiv", "DRURDRUDDLLDLUURRDULRLDUUDDDRR"},
	}
	for _, c := range cases {
		got := Part1(c.in)
		if got != c.want {
			t.Errorf("Part1(%q) == %s, want %s", c.in, got, c.want)
		}
	}
}

func TestPart2(t *testing.T) {
	cases := []struct {
		in   string
		want int
	}{
		{"ihgpwlah", 370},
		{"kglvqrro", 492},
		{"ulqzkmiv", 830},
	}
	for _, c := range cases {
		got := Part2(c.in)
		if got != c.want {
			t.Errorf("Part1(%q) == %v, want %v", c.in, got, c.want)
		}
	}
}
