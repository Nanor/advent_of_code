from aoc.days.day22 import monkey_gen


def test_monkey_gen():
    mon = monkey_gen(123)

    assert next(mon) == 15887950
    assert next(mon) == 16495136
    assert next(mon) == 527345
    assert next(mon) == 704524
    assert next(mon) == 1553684
    assert next(mon) == 12683156
    assert next(mon) == 11100544
    assert next(mon) == 12249484
    assert next(mon) == 7753432
    assert next(mon) == 5908254
