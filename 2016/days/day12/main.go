package day12

import (
	"fmt"
	"strconv"
	"strings"
)

type state struct {
	pc   int
	regs [4]int
}

type inst struct {
	t    string
	a, b int
}

func parse(file string) []inst {
	lines := strings.Split(file, "\n")
	out := make([]inst, 0, len(lines))

	for _, line := range lines {
		ps := strings.Split(line, " ")

		t := ps[0]
		a, aReg := strconv.Atoi(ps[1])

		if aReg == nil {
			t += "I"
		} else {
			t += "R"
			a = int(ps[1][0] - 'a')
		}

		var b int
		if len(ps) == 3 {
			b2, bReg := strconv.Atoi(ps[2])
			b = b2
			if bReg == nil {
				t += "I"
			} else {
				t += "R"
				b = int(ps[2][0] - 'a')
			}
		}

		out = append(out, inst{t, a, b})
	}

	return out
}

func (s *state) step(instructions []inst) (*state, bool) {
	if s.pc >= len(instructions) {
		return s, true
	}

	inst := instructions[s.pc]

	switch inst.t {
	case "cpyRR":
		s.regs[inst.b] = s.regs[inst.a]
	case "cpyIR":
		s.regs[inst.b] = inst.a
	case "incR":
		s.regs[inst.a]++
	case "decR":
		s.regs[inst.a]--
	case "jnzRI":
		if s.regs[inst.a] != 0 {
			s.pc += inst.b - 1
		}
	case "jnzII":
		if inst.a != 0 {
			s.pc += inst.b - 1
		}
	}
	s.pc++

	return s, false
}

func Run(lines []inst, init bool) int {
	s := &state{}

	if init {
		s.regs[2] = 1
	}

	var done bool
	for {
		s, done = s.step(lines)

		if done {
			return s.regs[0]
		}
	}
}

func Main(file string) {
	lines := parse(file)

	fmt.Println(Run(lines, false))
	fmt.Println(Run(lines, true))
}
