#!/bin/bash python3


from enum import Enum
import subprocess
import time

TIMEOUT = 15
WARNING_TIME = 5


class Colors(Enum):
    reset = "\033[0m"
    red = "\033[31m"
    green = "\033[32m"
    yellow = "\033[33m"


COMMANDS = {
    2015: lambda day: ["python3", f"day{day}.py"],
}


def main():
    year = 2015
    for day in range(1, 26):
        start_time = time.time()
        try:
            output = subprocess.run(
                COMMANDS[2015](day),
                cwd=f"{year}",
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=TIMEOUT,
            )
            end_time = time.time()

            answers = output.stdout.decode()
        except subprocess.TimeoutExpired:
            answers = ""
            end_time = time.time()

        try:
            with open(f"files/{year}_{day:02}a_answer.txt", mode="r") as f1:
                a1 = f1.read()
        except FileNotFoundError:
            a1 = ""
        try:
            with open(f"files/{year}_{day:02}b_answer.txt", mode="r") as f2:
                a2 = f2.read()
        except FileNotFoundError:
            a2 = ""

        if not a1 and not a2:
            continue

        expected = f"{a1}\n{a2}\n"

        correct = answers.strip() == expected.strip()

        symbol = "✔" if correct else "✖"
        ex_time = end_time - start_time

        if not correct:
            color = Colors.red.value
        elif ex_time > WARNING_TIME:
            color = Colors.yellow.value
        else:
            color = Colors.green.value

        print(f"{color}{symbol} {year} {day:>2} {ex_time:>7.4f}s{Colors.reset.value}")


if __name__ == "__main__":
    main()
