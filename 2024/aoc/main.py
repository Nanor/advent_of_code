import sys
from importlib import import_module
from aoc.puzzle import Puzzle
from aoc.days import *


def main():
    _, day = sys.argv
    import_module(f"aoc.days.day{day}")

    Day = next(p for p in Puzzle.__subclasses__() if p.day == int(day))

    day_puzzle = Day()

    if hasattr(day_puzzle, "part1"):
        print(day_puzzle.part1())
    if hasattr(day_puzzle, "part2"):
        print(day_puzzle.part2())


if __name__ == "__main__":
    main()
