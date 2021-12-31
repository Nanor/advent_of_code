#!/usr/local/bin/python3
from math import floor
import re


def run(insts, registers):
    ip = 0

    while ip >= 0 and ip < len(insts):
        line = insts[ip]

        op = line.split(" ")[0]
        reg = "a" if "a" in line else "b"

        # hlf r sets register r to half its current value, then continues with the next instruction.
        if op == "hlf":
            registers[reg] /= 2

        # tpl r sets register r to triple its current value, then continues with the next instruction.
        if op == "tpl":
            registers[reg] *= 3

        # inc r increments register r, adding 1 to it, then continues with the next instruction.
        if op == "inc":
            registers[reg] += 1

        jmp_match = re.search(r"([+-]\d+)", line)
        jmp_value = int(jmp_match.group(0)) if jmp_match else None

        # jmp offset is a jump; it continues with the instruction offset away relative to itself.
        if op == "jmp":
            ip += jmp_value
            continue

        # jie r, offset is like jmp, but only jumps if register r is even ("jump if even").
        if op == "jie":
            if registers[reg] % 2 == 0:
                ip += jmp_value
                continue

        # jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).
        if op == "jio":
            if registers[reg] == 1:
                ip += jmp_value
                continue

        ip += 1

    return registers["b"]


def main():
    with open("day23.txt") as fin:
        insts = [l.strip() for l in fin]

    print(run(insts, {"a": 0, "b": 0}))
    print(run(insts, {"a": 1, "b": 0}))


if __name__ == "__main__":
    main()
