from aocd.examples import Example
from aocd.models import Puzzle
from importlib import import_module
from os import listdir
from types import ModuleType
import pytest

excluded_days = [3]

days: list[int] = [
    int(d.removeprefix("day").removesuffix(".py"))
    for d in listdir("./src/days")
    if d.startswith("day")
]

days = [d for d in days if d not in excluded_days]

examples: list[tuple[ModuleType, Example]] = []

for day in days:
    code = import_module(f"src.days.day{day}")
    puzzle = Puzzle(year=2024, day=day)

    for example in puzzle.examples:
        examples.append((code, example))


@pytest.mark.parametrize("code, example", examples)
def test_examples(code: ModuleType, example: Example):
    if example.answer_a and hasattr(code, "part1"):
        assert (
            str(code.part1(example.input_data)) == example.answer_a
        ), f"Input data: \n\n{example.input_data}\n"
    if example.answer_b and hasattr(code, "part2"):
        assert (
            str(code.part2(example.input_data)) == example.answer_b
        ), f"Input data: \n\n{example.input_data}\n"
