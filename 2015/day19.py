#!/usr/local/bin/python3
import re


def part1(replacements, molecule: str):
    outputs = set()

    for rep in replacements:
        matches = re.finditer(rep[0], molecule)
        for match in matches:
            outputs.add(molecule[: match.start()] + rep[1] + molecule[match.end() :])

    return len(outputs)


def part2(replacements, molecule: str):
    states = [(molecule, 0)]

    while True:
        states.sort(key=lambda s: len(s[0]))

        (mol, depth) = states.pop(0)

        if mol == "e":
            return depth

        new_mols = set()

        for rep in replacements:
            matches = re.finditer(rep[1], mol)
            for match in matches:
                new_mols.add(mol[: match.start()] + rep[0] + mol[match.end() :])

        states += [(m, depth + 1) for m in new_mols]


def main():
    with open("../files/2015_19_input.txt") as fin:
        lines = list(fin)
        replacements = [l.strip().split(" => ") for l in lines[:-2]]
        molecule = lines[-1].strip()

    print(part1(replacements, molecule))
    print(part2(replacements, molecule))


if __name__ == "__main__":
    main()
