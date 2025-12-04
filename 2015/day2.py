#!/usr/local/bin/python3


def part1(boxes):
    total = 0

    for box in boxes:
        sides = [box[0] * box[1], box[0] * box[2], box[1] * box[2]]
        total += 2 * sum(sides) + min(sides)

    return total


def part2(boxes):
    total = 0

    for box in boxes:
        loops = [2 * x for x in [box[0] + box[1], box[0] + box[2], box[1] + box[2]]]
        total += min(loops) + box[0] * box[1] * box[2]

    return total


def main():
    with open("../files/2015_02_input.txt") as f:
        boxes = [[int(d) for d in line.split("x")] for line in f]

    print(part1(boxes))
    print(part2(boxes))


if __name__ == "__main__":
    main()
