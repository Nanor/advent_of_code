#!/usr/local/bin/python3
from collections import defaultdict
import re


class Instruction:
    def __init__(self, line, registers):
        self.registers = registers
        self.line = line

    def eval(self, reg, cond, val):
        if cond == "==":
            return self.registers[reg] == val
        if cond == "!=":
            return self.registers[reg] != val
        if cond == "<":
            return self.registers[reg] < val
        if cond == ">":
            return self.registers[reg] > val
        if cond == "<=":
            return self.registers[reg] <= val
        if cond == ">=":
            return self.registers[reg] >= val

    def run(self):
        m = re.search(r"^(\w+) (inc|dec) (-?\d+) if (\w+) (==|!=|<|>|<=|>=) (-?\d+)", self.line)
        (reg1, op, val1, reg2, cond, val2) = m.groups()

        val1 = int(val1)
        val2 = int(val2)

        if self.eval(reg2, cond, val2):
            self.registers[reg1] += val1 if op == "inc" else -val1


def main():
    registers = defaultdict(lambda: 0)
    with open("../files/2017_08_input.txt") as f:
        instructions = [Instruction(line, registers) for line in f]

    highest_record = 0
    for instruction in instructions:
        instruction.run()
        highest_record = max(highest_record, max(registers.values()))

    # part1
    print(max(registers.values()))

    # part2
    print(highest_record)


if __name__ == "__main__":
    main()
