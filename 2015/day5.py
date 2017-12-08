#!/usr/local/bin/python3


def part1(strings):
    def nice(string):
        vowel_count = len([c for c in string if c in 'aeiou'])

        if vowel_count < 3:
            return False

        for i, j in zip(string[:-1], string[1:]):
            if i == j:
                break
        else:
            return False

        naughties = ['ab', 'cd', 'pq', 'xy']
        for naughty in naughties:
            if naughty in string:
                return False

        return True

    return len([string for string in strings if nice(string)])


def part2(strings):
    def nice(string):
        for pair, rest in [(string[i:i + 2], string[i + 2:]) for i in range(len(string))]:
            if pair in rest:
                break
        else:
            return False

        for sub in [string[i:i + 3] for i in range(len(string) - 2)]:
            if sub[0] == sub[2]:
                break
        else:
            return False

        return True

    return len([string for string in strings if nice(string)])


def main():
    with open('day5.txt') as f:
        strings = [line.strip() for line in f]

    print(part1(strings))
    print(part2(strings))


if __name__ == '__main__':
    main()
