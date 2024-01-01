package day9

import (
	"testing"
)

func TestDecompress(t *testing.T) {
	cases := []struct {
		in   string
		want int
	}{
		{"ADVENT", len("ADVENT")},
		{"A(1x5)BC", len("ABBBBBC")},
		{"(3x3)XYZ", len("XYZXYZXYZ")},
		{"A(2x2)BCD(2x2)EFG", len("ABCBCDEFEFG")},
		{"(6x1)(1x3)A", len("(1x3)A")},
		{"X(8x2)(3x3)ABCY", len("X(3x3)ABC(3x3)ABCY")},
	}
	for _, c := range cases {
		if got := Decompress(c.in, false); got != c.want {
			t.Errorf("Decompress(%q) == %v, want %v", c.in, got, c.want)
		}
	}
}

func TestPart2(t *testing.T) {
	cases := []struct {
		in   string
		want int
	}{
		{"(3x3)XYZ", len("XYZXYZXYZ")},
		{"X(8x2)(3x3)ABCY", len("XABCABCABCABCABCABCY")},
		{"(27x12)(20x12)(13x14)(7x10)(1x12)A", 241920},
		{"(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", 445},
	}
	for _, c := range cases {
		if got := Decompress(c.in, true); got != c.want {
			t.Errorf("Part2(%q) == %v, want %v", c.in, got, c.want)
		}
	}
}
