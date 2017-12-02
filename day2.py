def part1(spreadsheet):
    return sum(max(line) - min(line) for line in spreadsheet)

def part2(spreadsheet):
    total = 0
    for line in spreadsheet:
        for a in line:
            for b in line:
                if a != b and a % b == 0:
                    total += a / b
    return total

def main():
    spreadsheet = []
    with open('day2.txt') as f:
        for line in f:
            spreadsheet.append([int(d) for d in line.strip().split('\t')])

    print(part1(spreadsheet))
    print(part2(spreadsheet))

if __name__ == '__main__':
    main()