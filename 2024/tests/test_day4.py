from aoc.days.day4 import Day4


def test_example_1():
    example: str = (
        """MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX"""
    )
    day = Day4(example)
    assert day.part1() == 18


def test_example_2():
    example: str = (
        """MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX"""
    )
    day = Day4(example)
    assert day.part2() == 9
