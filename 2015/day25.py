#!/usr/local/bin/python3
import re


def main():
    with open("day25.txt") as fin:
        [row, col] = [int(x) for x in re.findall(r"(\d+)", next(fin))]

    code = 20151125

    x = 0
    y = 1

    while True:
        code = (code * 252533) % 33554393

        if (x + 1) == col and (y + 1) == row:
            print(code)
            return

        if y == 0:
            y = x + 1
            x = 0
        else:
            y -= 1
            x += 1


if __name__ == "__main__":
    main()
