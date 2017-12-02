def part1(input_string):
    return sum(int(digit) for i, digit in enumerate(input_string) if digit == input_string[(i + 1) % len(input_string)])


def part2(input_string):
    return sum(int(digit) for i, digit in enumerate(input_string) if digit == input_string[(i + len(input_string) / 2) % len(input_string)])


def main():
    with open('day1.txt') as f:
        input_string = f.read()

    print(part1(input_string))
    print(part2(input_string))

if __name__ == '__main__':
    main()
