from aocd.examples import Example
from aocd.models import Puzzle as AocPuzzle
from importlib import import_module
from os import listdir
import pytest

from aoc.puzzle import Puzzle

excluded_days = [3, 4, 12, 13, 14, 15, 16]

days: list[int] = [
    int(d.removeprefix("day").removesuffix(".py"))
    for d in listdir("./aoc/days")
    if d.startswith("day")
]
days = [d for d in days if d not in excluded_days]

for day in days:
    import_module(f"aoc.days.day{day}")

examples: list[tuple[type[Puzzle], Example]] = []

for day in days:
    puzzle = AocPuzzle(year=2024, day=day)

    code = next(p for p in Puzzle.__subclasses__() if p.day == day)

    for example in puzzle.examples:
        examples.append((code, example))


@pytest.mark.parametrize("Puzzle, example", examples)
def test_examples(Puzzle: type[Puzzle], example: Example):

    day = Puzzle(example.input_data)

    if example.answer_a and hasattr(day, "part1"):
        assert (
            str(day.part1()) == example.answer_a
        ), f"Input data: \n\n{example.input_data}\n"
    if example.answer_b and hasattr(day, "part2"):
        assert (
            str(day.part2()) == example.answer_b
        ), f"Input data: \n\n{example.input_data}\n"
