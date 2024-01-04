package day14

import (
	"crypto/md5"
	"fmt"
)

func Part1(salt string) int {
	index := 0

	for i := 0; ; i++ {
		h := md5.New()
		h.Write([]byte(salt + fmt.Sprint(i)))
		hash := fmt.Sprintf("%x", h.Sum(nil))

		var char byte
		for k := 0; k < len(hash)-2; k++ {
			if hash[k] == hash[k+1] && hash[k] == hash[k+2] {
				char = hash[k]
				break
			}
		}

		if char == 0 {
			continue
		}

		for j := i + 1; j < i+1001; j++ {
			h := md5.New()
			h.Write([]byte(salt + fmt.Sprint(j)))
			hash := fmt.Sprintf("%x", h.Sum(nil))

			var isKey bool

			for k := 0; k < len(hash)-4; k++ {
				if hash[k] == char &&
					hash[k+1] == char &&
					hash[k+2] == char &&
					hash[k+3] == char &&
					hash[k+4] == char {
					isKey = true
					break
				}
			}

			if isKey {
				index++
				break
			}
		}

		if index == 64 {
			return i
		}
	}
}

func repHash(seed string) string {
	for i := 0; i <= 2016; i++ {
		h := md5.New()
		h.Write([]byte(seed))
		seed = fmt.Sprintf("%x", h.Sum(nil))
	}
	return seed
}

func Part2(salt string) int {

	hashes := make(map[int]string, 0)

	get := func(i int) string {
		h, ok := hashes[i]

		if ok {
			return h
		}
		h = repHash(salt + fmt.Sprint(i))

		hashes[i] = h
		return h
	}

	index := 0

	for i := 0; ; i++ {
		hash := get(i)

		var char byte
		for k := 0; k < len(hash)-2; k++ {
			if hash[k] == hash[k+1] && hash[k] == hash[k+2] {
				char = hash[k]
				break
			}
		}

		if char == 0 {
			continue
		}

		for j := i + 1; j < i+1001; j++ {
			hash := get(j)

			var isKey bool

			for k := 0; k < len(hash)-4; k++ {
				if hash[k] == char &&
					hash[k+1] == char &&
					hash[k+2] == char &&
					hash[k+3] == char &&
					hash[k+4] == char {
					isKey = true
					break
				}
			}

			if isKey {
				index++
				break
			}
		}

		if index == 64 {
			return i
		}
	}
}

func Main(file string) {
	fmt.Println(Part1(file))
	fmt.Println(Part2(file))
}
