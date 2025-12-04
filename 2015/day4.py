#!/usr/local/bin/python3
from hashlib import md5


def mine(input, zero_count):
    i = 0
    hash = ""

    while not hash.startswith("".join("0" * zero_count)):
        i += 1
        key = input + str(i)

        m = md5()
        m.update(key.encode("utf-8"))
        hash = m.hexdigest()

    return i


def main():
    with open("../files/2015_04_input.txt") as f:
        input = f.read().strip()

    print(mine(input, 5))
    print(mine(input, 6))


if __name__ == "__main__":
    main()
