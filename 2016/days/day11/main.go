package day11

import (
	"fmt"
	"regexp"
	"strings"
)

type State struct {
	floors   [4]uint
	elevator int8
}

func (s State) copy() State {
	return s
}

func (s State) options() []State {
	out := make([]State, 0)

	currF := s.elevator
	for f := max(0, currF-1); f < min(4, currF+2); f++ {
		if currF == f {
			continue
		}

		for a := uint(0); a < 32; a++ {
			if (a != 0) && ((s.floors[currF] & (1 << a)) == 0) {
				continue
			}
			for b := a + 1; b < 32; b++ {
				if (s.floors[currF] & (1 << b)) == 0 {
					continue
				}

				move := uint(1<<a|1<<b) & ^uint(1)

				newS := s.copy()
				newS.floors[currF] = newS.floors[currF] & ^move
				newS.floors[f] = newS.floors[f] | move
				newS.elevator = f

				out = append(out, newS)
			}
		}
	}

	return out
}

func (s State) valid() bool {
	for f := uint8(0); f < 4; f++ {
		chips := s.floors[f] & ((1 << 16) - 1)
		generators := (s.floors[f] >> 16)

		if (generators > 0) && (chips&(^(chips & generators)) > 0) {
			return false
		}
	}

	return true
}

func (s State) solved() bool {
	if s.elevator != 3 {
		return false
	}
	for i := 0; i < 3; i++ {
		if s.floors[i] != 0 {
			return false
		}
	}
	return true
}

func solve(start State) int {
	checked := make(map[State]bool)

	states := make([]State, 1)
	states[0] = start

	for i := 0; ; i++ {
		newStates := make([]State, 0)

		for _, s := range states {
			for _, newS := range s.options() {

				if checked[newS] || !newS.valid() {
					continue
				}
				if newS.solved() {
					return i + 1
				}
				newStates = append(newStates, newS)
				checked[newS] = true
			}
		}

		if len(newStates) == 0 {
			panic("Ran out of states")
		}
		states = newStates
	}
}

func parse(file string) State {
	chemicals := map[string]uint8{
		"plutonium":  1,
		"promethium": 2,
		"ruthenium":  3,
		"strontium":  4,
		"thulium":    5,
		"hydrogen":   6,
		"lithium":    7,
	}

	var state State

	reChip := regexp.MustCompile(`\w+-compatible microchip`)
	reGenerator := regexp.MustCompile(`\w+ generator`)
	reFirst := regexp.MustCompile(`^\w+`)
	for floor, line := range strings.Split(file, "\n") {
		chips := reChip.FindAllString(line, -1)
		generators := reGenerator.FindAllString(line, -1)

		for _, chip := range chips {
			chem := reFirst.FindString(chip)
			state.floors[floor] = state.floors[floor] | 1<<chemicals[chem]
		}
		for _, generator := range generators {
			chem := reFirst.FindString(generator)
			state.floors[floor] = state.floors[floor] | 1<<(chemicals[chem]+16)
		}
	}

	return state
}

func Part1(file string) int {
	return solve(parse(file))
}

func Part2(file string) int {
	s := parse(file)

	s.floors[0] = s.floors[0] | ((1 << 8) | (1 << 9) | (1 << 24) | (1 << 25))

	return solve(s)
}

func Main(file string) {
	fmt.Println(Part1(file))
	fmt.Println(Part2(file))
}
