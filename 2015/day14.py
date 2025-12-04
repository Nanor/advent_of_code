#!/usr/local/bin/python3
import re
from collections import defaultdict


def get_distance(speed, on_time, off_time, time):
    cycles = time // (on_time + off_time)
    remainder = time % (on_time + off_time)
    return (cycles * on_time + min(remainder, on_time)) * speed


def at_time(reindeer, time):
    return ((name, get_distance(int(speed), int(on), int(off), time)) for (name, speed, on, off) in reindeer)


def part1(reindeer, time):
    return max(d for n, d in at_time(reindeer, time))


def part2(reindeer, time):
    scores = defaultdict(lambda: 0)
    for t in range(1, time + 1):
        rs = list(at_time(reindeer, t))
        max_dist = max(d for n, d in rs)

        for n, d in rs:
            if d == max_dist:
                scores[n] += 1

    return max(scores.values())


def main():
    reindeer = []
    with open("../files/2015_14_input.txt") as file:
        exp = re.compile(r"(\w+) can fly (\d+) km/s for (\d+) seconds, but then must rest for (\d+) seconds.")
        for line in file:
            m = exp.match(line)
            reindeer.append(m.groups())

    time = 2503
    print(part1(reindeer, time))
    print(part2(reindeer, time))


if __name__ == "__main__":
    main()
