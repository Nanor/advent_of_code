def part1(inputs):
    total = 0

    for line in inputs:
        if len(set(line)) == len(line):
            total += 1

    return total

def part2(inputs):
    total = 0

    for line in inputs:
        valid = True
        for i, word1 in enumerate(line):
            for j, word2 in enumerate(line):
                if i != j:
                    if sorted(word1) == sorted(word2):
                        valid = False
        if valid:
            total += 1

    return total

def main():
    inputs = []
    with open('day4.txt') as f:
        for line in f:
            inputs.append(line.strip().split(' '))

    print(part1(inputs))
    print(part2(inputs))

if __name__ == '__main__':
    main()