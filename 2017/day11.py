#!/usr/local/bin/python3


def step(current, direction):
    x, y, z = current

    if direction == "n":
        return x, y + 1, z - 1
    if direction == "s":
        return x, y - 1, z + 1
    if direction == "ne":
        return x + 1, y, z - 1
    if direction == "sw":
        return x - 1, y, z + 1
    if direction == "nw":
        return x - 1, y + 1, z
    if direction == "se":
        return x + 1, y - 1, z


def navigate(directions):
    current = (0, 0, 0)
    record = 0

    for direction in directions:
        current = step(current, direction)

        record = max(record, max(abs(n) for n in current))

    return max(abs(n) for n in current), record


def main():
    with open("../files/2017_11_input.txt") as f:
        directions = f.read().strip().split(",")

    final, record = navigate(directions)

    # part1
    print(final)

    # part2
    print(record)


if __name__ == "__main__":
    main()
