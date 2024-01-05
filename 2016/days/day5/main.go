package day5

import (
	"crypto/md5"
	"fmt"
)

func Part1(id string) string {
	out := make([]byte, 0, 8)

	for i := 0; len(out) < 8; i++ {
		h := md5.New()
		h.Write([]byte(id + fmt.Sprint(i)))
		hash := h.Sum(nil)

		if hash[0] == 0 && hash[1] == 0 && hash[2] < 16 {
			if hash[2] < 10 {
				out = append(out, '0'+hash[2])
			} else {
				out = append(out, 'a'-10+hash[2])
			}
		}
	}

	return string(out)
}

func Part2(id string) string {
	out := make([]byte, 8)
	filled := 0

	for i := 0; filled < 8; i++ {
		h := md5.New()
		h.Write([]byte(id + fmt.Sprint(i)))
		hash := h.Sum(nil)

		if hash[0] == 0 && hash[1] == 0 && hash[2] < 16 {
			i, v := hash[2], hash[3]>>4

			if i < 8 && out[i] == 0 {
				var c byte
				if v < 10 {
					c = '0' + v
				} else {
					c = 'a' - 10 + v
				}
				out[i] = c
				filled++
			}
		}
	}

	return string(out)
}

func Main(id string) {
	fmt.Println(Part1(id))
	fmt.Println(Part2(id))
}
