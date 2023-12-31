package day4

import (
	"testing"
)

func TestPart1(t *testing.T) {

	input := "aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]"
	
	got := Part1(Valid(Parse(input)))
	want := "1514"
	if got != want {
		t.Errorf("Part1() == %q, want %q", got, want)
	}
}
