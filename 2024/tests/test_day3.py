from aoc.days.day3 import Day3


def test_example_1():
    example: str = (
        "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
    )
    day = Day3(example)
    assert day.part1() == 161


def test_example_2():
    example: str = (
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    )
    day = Day3(example)
    assert day.part2() == 48
