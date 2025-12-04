#!/usr/local/bin/python3
import re

print_out = {
    "children": 3,
    "cats": 7,
    "samoyeds": 2,
    "pomeranians": 3,
    "akitas": 0,
    "vizslas": 0,
    "goldfish": 5,
    "trees": 3,
    "cars": 2,
    "perfumes": 1,
}


def part1(aunts):
    for i, aunt in enumerate(aunts):
        for k, v in aunt.items():
            if print_out[k] != v:
                break
        else:
            return i + 1


def part2(aunts):
    for i, aunt in enumerate(aunts):
        for k, v in aunt.items():
            if k in ["cats", "trees"]:
                if print_out[k] >= v:
                    break
            elif k in ["pomeranians", "goldfish"]:
                if print_out[k] <= v:
                    break
            elif print_out[k] != v:
                break
        else:
            return i + 1


def main():
    aunts = []
    with open("../files/2015_16_input.txt") as fin:
        exp = re.compile(r"(\w+): (\d+)")
        for line in fin:
            m = exp.findall(line)
            aunts.append({name: int(count) for (name, count) in m})

    print(part1(aunts))
    print(part2(aunts))


if __name__ == "__main__":
    main()
