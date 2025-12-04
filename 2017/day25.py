#!/usr/local/bin/python3
import re
from collections import defaultdict


def parse(file):
    input = file.read()
    rules = []

    starting = re.search(r"Begin in state (\w+).", input).group(1)
    steps = int(re.search(r"Perform a diagnostic checksum after (\d+) steps.", input).group(1))

    sections = re.findall(
        r"""In state (\w):
  If the current value is (\d):
    - Write the value (\d).
    - Move one slot to the (\w+).
    - Continue with state (\w).
  If the current value is (\d):
    - Write the value (\d).
    - Move one slot to the (\w+).
    - Continue with state (\w).""",
        input,
    )

    for section in sections:
        state, val1, new_val1, move1, new_state1, val2, new_val2, move2, new_state2 = section

        rules.append(
            {"state": state, "value": int(val1), "new_value": int(new_val1), "move": move1, "new_state": new_state1}
        )
        rules.append(
            {"state": state, "value": int(val2), "new_value": int(new_val2), "move": move2, "new_state": new_state2}
        )

    return {"starting_state": starting, "steps": steps, "rules": rules}


def part1(machine):
    tape = defaultdict(lambda: 0)
    pointer = 0
    state = machine["starting_state"]

    for _ in range(machine["steps"]):
        rule = next(rule for rule in machine["rules"] if rule["state"] == state and rule["value"] == tape[pointer])
        tape[pointer] = rule["new_value"]
        pointer += 1 if rule["move"] == "right" else -1
        state = rule["new_state"]

    return len([v for v in tape.values() if v])


def main():
    with open("../files/2017_25_input.txt") as f:
        machine = parse(f)

    print(part1(machine))


if __name__ == "__main__":
    main()
