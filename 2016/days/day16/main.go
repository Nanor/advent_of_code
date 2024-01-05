package day16

import (
	"fmt"
)

func dragon(str string) string {
	bs := []byte(str)
	out := make([]byte, 0, len(bs)*2+1)

	out = append(out, bs...)
	out = append(out, '0')
	for i := len(bs) - 1; i >= 0; i-- {
		if bs[i] == '1' {
			out = append(out, '0')
		} else {
			out = append(out, '1')
		}
	}

	return string(out)
}

func checksum(str string) string {
	out := make([]byte, 0, len(str)/2)

	for i := 0; i < len(str); i += 2 {
		if str[i] == str[i+1] {
			out = append(out, '1')
		} else {
			out = append(out, '0')
		}
	}

	return string(out)
}

func solve(str string, length int) string {
	for len(str) < length {
		str = dragon(str)
	}
	str = str[:length]
	for len(str)%2 == 0 {
		str = checksum(str)
	}

	return str
}

func Main(file string) {
	fmt.Println(solve(file, 272))
	fmt.Println(solve(file, 35651584))
}
