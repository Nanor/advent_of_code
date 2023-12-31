package day4

import (
	"fmt"
	"regexp"
	"sort"
	"strconv"
	"strings"

	"github.com/nanor/advent_of_code/2016/utils"
)

type Room struct {
	name     string
	id       int
	checksum string
}

func Parse(file string) []Room {
	out := make([]Room, 0)

	lines := strings.Split(file, "\n")
	re := regexp.MustCompile(`^([a-z-]+)-(\d+)\[([a-z]{5})\]$`)
	for _, line := range lines {
		matches := re.FindSubmatch([]byte(line))[1:]

		name := string(matches[0])
		id, _ := strconv.Atoi(string(matches[1]))
		checksum := matches[2]

		out = append(out, Room{name, id, string(checksum)})

	}

	return out
}

func Valid(rooms []Room) []Room {
	out := make([]Room, 0, len(rooms))

	for _, room := range rooms {
		counts := make(map[rune]int)

		for _, r := range room.name {
			if r != '-' {
				counts[r]++
			}
		}

		keys := utils.Keys(counts)
		sort.Slice(keys, func(i, j int) bool {
			a, b := counts[keys[i]], counts[keys[j]]
			if a == b {
				return byte(keys[i]) < byte(keys[j])
			}
			return b < a
		})

		if string(keys[:5]) == room.checksum {
			out = append(out, room)
		}
	}

	return out
}

func Part1(rooms []Room) string {
	var sum int

	for _, room := range rooms {
		sum += room.id
	}

	return fmt.Sprint(sum)
}

func Part2(rooms []Room) string {
	for _, room := range rooms {
		name := []byte(room.name)

		for i, b := range name {
			if b >= 'a' && b <= 'z' {
				name[i] = byte((int(b-'a')+room.id)%26) + 'a'
			} else {
				name[i] = ' '
			}

		}

		if string(name) == "northpole object storage" {
			return fmt.Sprint(room.id)
		}
	}

	panic("No match found")
}

func Main(file string) {
	parsed := Parse(file)
	valid := Valid(parsed)
	fmt.Println(Part1(valid))
	fmt.Println(Part2(valid))
}
