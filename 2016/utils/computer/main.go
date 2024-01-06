package computer

import (
	"strconv"
	"strings"
)

type State struct {
	pc   int
	Regs [4]int
}

type inst struct {
	t            string
	a, b         int
	aType, bType rune
}

func Parse(file string) []inst {
	lines := strings.Split(file, "\n")
	out := make([]inst, 0, len(lines))

	for _, line := range lines {
		ps := strings.Split(line, " ")

		t := ps[0]
		a, aReg := strconv.Atoi(ps[1])

		aType, bType := 'I', 'I'

		if aReg != nil {
			aType = 'R'
			a = int(ps[1][0] - 'a')
		}

		var b int
		if len(ps) == 3 {
			b2, bReg := strconv.Atoi(ps[2])
			b = b2
			if bReg != nil {
				bType = 'R'
				b = int(ps[2][0] - 'a')
			}
		}

		out = append(out, inst{t, a, b, aType, bType})
	}

	return out
}

func (s *State) step(instructions []inst, ch chan int) (*State, bool) {
	if s.pc >= len(instructions) {
		return s, true
	}

	inst := instructions[s.pc]

	aVal, bVal := inst.a, inst.b
	if inst.aType == 'R' {
		aVal = s.Regs[inst.a]
	}
	if inst.bType == 'R' {
		bVal = s.Regs[inst.b]
	}

	switch inst.t {
	case "cpy":
		s.Regs[inst.b] = aVal
	case "inc":
		s.Regs[inst.a]++
	case "dec":
		s.Regs[inst.a]--
	case "jnz":
		if aVal != 0 {
			s.pc += bVal - 1
		}
	case "tgl":
		lineNo := s.pc + aVal
		if lineNo < len(instructions) {

			oldInst := instructions[s.pc+aVal].t
			var newInst string
			switch oldInst {
			case "dec", "tgl":
				newInst = "inc"
			case "inc":
				newInst = "dec"
			case "jnz":
				newInst = "cpy"
			case "cpy":
				newInst = "jnz"
			}

			instructions[s.pc+aVal].t = newInst
		}
	case "out":
		ch <- aVal
	}
	s.pc++

	return s, false
}

func Run(lines []inst, init State, chs ...chan int) State {
	var ch chan int
	if len(chs) > 0 {
		ch = chs[0]
	}

	s := &init

	var done bool
	for {
		s, done = s.step(lines, ch)

		if done {
			return *s
		}
	}
}
