import sys
import os
from datetime import datetime
from aocd.models import Puzzle
import json


def download_day(day: int) -> None:
    puzzle = Puzzle(year=2024, day=day)

    try:
        os.mkdir("./tests/examples/")
    except FileExistsError:
        pass

    examples: list[dict[str, str]] = []
    for example in puzzle.examples:
        ex = {
            "input": example.input_data,
        }
        if part1 := example.answer_a:
            ex["part1"] = part1
        if part2 := example.answer_b:
            ex["part2"] = part2

        examples.append(ex)

    with open(f"./tests/examples/day{day}.json", mode="w") as fout:
        json.dump(examples, fout, indent=2)


def main() -> None:
    if len(sys.argv) > 1:
        _, day = sys.argv
        download_day(int(day))
    else:
        for day in range(1, 26):
            if datetime(2024, 12, day) <= datetime.today():
                download_day(day)
