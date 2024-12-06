from importlib import import_module
from os import listdir
from pytest_snapshot.plugin import Snapshot
import pytest

from aoc.puzzle import Puzzle

days = [
    int(d.removeprefix("day").removesuffix(".py"))
    for d in listdir("./aoc/days")
    if d.startswith("day")
]

for day in days:
    import_module(f"aoc.days.day{day}")


@pytest.mark.parametrize("day", days)
def test_snapshot(day: int, snapshot: Snapshot):
    Code = next(p for p in Puzzle.__subclasses__() if p.day == day)
    code = Code()

    if hasattr(code, "part1"):
        snapshot.assert_match(str(code.part1()), f"day{day}_part1.txt")
    if hasattr(code, "part2"):
        snapshot.assert_match(str(code.part2()), f"day{day}_part2.txt")
