import json
from importlib import import_module
from os import listdir
import pytest

from aoc.puzzle import Puzzle


days: list[int] = [
    int(d.removeprefix("day").removesuffix(".py"))
    for d in listdir("./aoc/days")
    if d.startswith("day")
]

for day in days:
    import_module(f"aoc.days.day{day}")

examples: list[tuple[type[Puzzle], dict[str, str]]] = []

for day in days:
    code = next(p for p in Puzzle.__subclasses__() if p.day == day)

    with open(f"./tests/examples/day{day}.json", mode="r") as fin:
        for example in json.load(fin):
            examples.append((code, example))


@pytest.mark.parametrize("Puzzle, example", examples)
def test_examples(Puzzle: type[Puzzle], example: dict[str, str]):

    day = Puzzle(example["input"])

    if "part1" in example and hasattr(day, "part1"):
        assert (
            str(day.part1()) == example["part1"]
        ), f"Input data: \n\n{example['input']}\n"
    if "part2" in example and hasattr(day, "part2"):
        assert (
            str(day.part2()) == example["part2"]
        ), f"Input data: \n\n{example['input']}\n"
