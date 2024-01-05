package day18

import (
	"testing"
)

func TestPart1(t *testing.T) {
	cases := []struct {
		in   string
		want int
	}{
		{".^^.^.^^^^", 38},
	}
	for _, c := range cases {
		got := solve(c.in, 10)
		if got != c.want {
			t.Errorf("solve(%q, 10) == %v, want %v", c.in, got, c.want)
		}
	}
}
