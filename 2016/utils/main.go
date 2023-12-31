package utils

func Abs(x int) int {
	return max(x, -x)
}

func Keys(m map[rune]int) []rune {
	keys := make([]rune, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}
