from aocd import get_data
from importlib import import_module
from os import listdir
from pytest_snapshot.plugin import Snapshot
import pytest

days = [
    int(d.removeprefix("day").removesuffix(".py"))
    for d in listdir("./src/days")
    if d.startswith("day")
]


@pytest.mark.parametrize("day", days)
def test_snapshot(day: int, snapshot: Snapshot):
    code = import_module(f"src.days.day{day}")
    data = get_data(year=2024, day=day)

    if hasattr(code, "part1"):
        snapshot.assert_match(str(code.part1(data)), f"day{day}_part1.txt")
    if hasattr(code, "part2"):
        snapshot.assert_match(str(code.part2(data)), f"day{day}_part2.txt")
