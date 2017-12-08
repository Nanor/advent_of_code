#!/usr/local/bin/python3


def redistribute(stacks):
    history = []

    while stacks not in history:
        history.append(list(stacks))

        max_value = max(stacks)
        highest_stack = stacks.index(max_value)

        stacks[highest_stack] = 0
        for n in range(max_value):
            stacks[(highest_stack + n + 1) % len(stacks)] += 1

    history.append(stacks)

    return history


def main():
    with open('day6.txt') as f:
        stacks = [int(x) for x in f.read().strip().split('\t')]

    history = redistribute(stacks)

    # Part 1
    print(len(history) - 1)

    # Part 2
    loop_start = history.index(history[-1])
    print(len(history) - loop_start - 1)


if __name__ == '__main__':
    main()
