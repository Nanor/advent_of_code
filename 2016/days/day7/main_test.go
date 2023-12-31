package day7

import (
	"testing"
)

func TestSupportsTLS(t *testing.T) {
	cases := []struct {
		in   string
		want bool
	}{
		{"abba[mnop]qrst", true},
		{"abcd[bddb]xyyx", false},
		{"aaaa[qwer]tyui", false},
		{"ioxxoj[asdfgh]zxcvbn", true},
	}
	for _, c := range cases {
		if got := SupportsTLS(c.in); got != c.want {
			t.Errorf("SupportsTLS(%q) == %t, want %t", c.in, got, c.want)
		}
	}
}

func TestSupportsSSL(t *testing.T) {
	cases := []struct {
		in   string
		want bool
	}{
		{"aba[bab]xyz", true},
		{"xyx[xyx]xyx", false},
		{"aaa[kek]eke", true},
		{"zazbz[bzb]cdb", true},
	}
	for _, c := range cases {
		if got := SupportsSSL(c.in); got != c.want {
			t.Errorf("Supports(%q) == %t, want %t", c.in, got, c.want)
		}
	}
}
