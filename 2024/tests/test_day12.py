from aoc.days.day12 import Day12

example_1: str = """AAAA
BBCD
BBCC
EEEC"""

example_2: str = """OOOOO
OXOXO
OOOOO
OXOXO
OOOOO"""

example_3: str = """RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE"""


example_4: str = """AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA"""


def test_part_1_example_1():
    day = Day12(example_1)
    assert day.part1() == 140


def test_part_1_example_2():
    day = Day12(example_2)
    assert day.part1() == 772


def test_part_1_example_3():
    day = Day12(example_3)
    assert day.part1() == 1930


def test_part_2_example_1():
    day = Day12(example_1)
    assert day.part2() == 80


def test_part_2_example_2():
    day = Day12(example_2)
    assert day.part2() == 436


def test_part_2_example_3():
    day = Day12(example_3)
    assert day.part2() == 1206


def test_part_2_example_4():
    day = Day12(example_4)
    assert day.part2() == 368
