package day16

import (
	"testing"
)

func TestPart1(t *testing.T) {
	got := solve("10000", 20)
	want := "01100"
	if got != want {
		t.Errorf("Part1 == %s, want %s", got, want)
	}
}
