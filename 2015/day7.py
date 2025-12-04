#!/usr/local/bin/python3
import re


def evaluate(wire, instructions):
    instruction = instructions[wire]

    try:
        return int(instruction)
    except ValueError:
        pass
    if re.match(r"^\w+$", instruction):
        value = evaluate(instruction, instructions)
        instructions[wire] = value
        return value

    m = re.search(r"^(\w+ )?(AND|OR|NOT|LSHIFT|RSHIFT) (\w+)$", instruction)
    (x, inst, y) = m.groups()

    if x:
        try:
            x = int(x)
        except ValueError:
            x = evaluate(x.strip(), instructions)
    try:
        y = int(y)
    except ValueError:
        y = evaluate(y, instructions)

    if inst == "AND":
        value = x & y
    if inst == "OR":
        value = x | y
    if inst == "NOT":
        value = ~y
    if inst == "LSHIFT":
        value = x << y
    if inst == "RSHIFT":
        value = x >> y

    instructions[wire] = value
    return value


def main():
    with open("../files/2015_07_input.txt") as f:
        instructions = {k: v for (v, k) in [line.strip().split(" -> ") for line in f]}

    # part1
    a_value = evaluate("a", instructions.copy())
    print(a_value)

    i = instructions.copy()
    i["b"] = a_value
    print(evaluate("a", i))


if __name__ == "__main__":
    main()
