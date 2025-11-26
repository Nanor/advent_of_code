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
    2016: lambda day: ["go", "run", ".", f"{day}"],
    2017: lambda day: ["python3", f"day{day}.py"],
    2018: lambda day: ["cargo", "run", "--release", "--bin", f"day{day}"],
    2019: lambda day: ["npm", "--silent", "start", f"{day}"],
    2020: lambda day: ["npm", "--silent", "start", f"{day}"],
    2021: lambda day: ["npm", "--silent", "start", f"{day}"],
    2022: lambda day: ["npm", "--silent", "start", f"{day}"],
    2023: lambda day: ["bun", "--silent", "start", f"{day}"],
    2024: lambda day: ["poetry", "run", "solve", f"{day}"],
}


def run_year(year):
    for day in range(1, 26):
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


def main():
    run_year(2015)
    run_year(2016)
    run_year(2017)
    run_year(2018)
    run_year(2019)
    run_year(2020)
    run_year(2021)
    run_year(2022)
    run_year(2023)
    run_year(2024)


if __name__ == "__main__":
    main()
