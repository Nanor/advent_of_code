#!/bin/bash python3


from enum import Enum
import subprocess
import sys
import time

TIMEOUT = 15
WARNING_TIME = 5


class Colors(Enum):
    reset = "\033[0m"
    red = "\033[31m"
    green = "\033[32m"
    yellow = "\033[33m"


PRE_RUN = {
    2018: ["cargo", "build", "--release"],
    2019: ["npm", "i"],
    2020: ["npm", "i"],
    2021: ["npm", "i"],
    2022: ["npm", "i"],
    2023: ["bun", "i"],
    2025: ["cargo", "build", "--release"],
}

COMMANDS = {
    2015: lambda day: ["python3", f"day{day}.py"],
    2016: lambda day: ["go", "run", ".", f"{day}"],
    2017: lambda day: ["python3", f"day{day}.py"],
    2018: lambda day: ["./target/release/year2018", f"{day}"],
    2019: lambda day: ["npm", "--silent", "start", f"{day}"],
    2020: lambda day: ["npm", "--silent", "start", f"{day}"],
    2021: lambda day: ["npm", "--silent", "start", f"{day}"],
    2022: lambda day: ["npm", "--silent", "start", f"{day}"],
    2023: lambda day: ["bun", "--silent", "start", f"{day}"],
    2024: lambda day: ["poetry", "run", "solve", f"{day}"],
    2025: lambda day: ["./target/release/y2025", f"{day}"],
}


def run_year(year):
    if year in PRE_RUN:
        subprocess.run(
            PRE_RUN[year],
            cwd=f"{year}",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

    for day in range(1, 26):
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

        start_time = time.time()
        try:
            output = subprocess.run(
                COMMANDS[year](day),
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


def main():
    years = sys.argv[1:] or range(2015, 2026)

    for year in years:
        run_year(int(year))


if __name__ == "__main__":
    main()
