from itertools import combinations

def part1(inputs):
    return len([line for line in inputs if len(set(line)) == len(line)])

def part2(inputs):
    def valid(line):
        for word1, word2 in combinations(line, 2):
            if sorted(word1) == sorted(word2):
                return False
        return True

    return len([line for line in inputs if valid(line)])

def main():
    with open('day4.txt') as f:
        inputs = [line.strip().split(' ') for line in f]

    print(part1(inputs))
    print(part2(inputs))

if __name__ == '__main__':
    main()