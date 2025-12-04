#!/usr/local/bin/python3
from math import prod


def part1(weights):
    def pick(weights, target, group=[], first=False):
        nonlocal min_size
        if first and len(group) > min_size:
            return

        weight = sum(group)
        if weight == target:
            yield group
        if weight > target or len(weights) == 0:
            return

        for x in pick(weights[1:], target, group, first):
            yield x
        for x in pick(weights[1:], target, group + [weights[0]], first):
            yield x

    target = int(sum(weights) / 3)

    min_size = len(weights)
    min_qe = prod(weights)

    for p in pick(weights, target, [], True):
        if len(p) > min_size:
            continue
        qe = prod(p)
        if len(p) == min_size and qe > min_qe:
            continue

        valid = next(pick([w for w in weights if w not in p], target))

        if valid:
            min_size = len(p)
            min_qe = qe

    return min_qe


def part2(weights):
    def pick(weights, target, group=[], first=False):
        nonlocal min_size
        if first and len(group) > min_size:
            return

        weight = sum(group)
        if weight == target:
            yield group
        if weight > target or len(weights) == 0:
            return

        for x in pick(weights[1:], target, group, first):
            yield x
        for x in pick(weights[1:], target, group + [weights[0]], first):
            yield x

    target = int(sum(weights) / 4)

    min_size = len(weights)
    min_qe = prod(weights)

    for p in pick(weights, target, [], True):
        if len(p) > min_size:
            continue
        qe = prod(p)
        if len(p) == min_size and qe > min_qe:
            continue

        for p2 in pick([w for w in weights if w not in p], target):
            for _ in pick([w for w in weights if w not in p and w not in p2], target):
                min_size = len(p)
                min_qe = qe
                break
            else:
                continue
            break

    return min_qe


def main():
    with open("../files/2015_24_input.txt") as fin:
        weights = [int(w) for w in fin]

    print(part1(weights))
    print(part2(weights))


if __name__ == "__main__":
    main()
