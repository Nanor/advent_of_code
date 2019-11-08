#!/usr/local/bin/python3
test_input = """
.#.#.#
...##.
#....#
..#...
#.#..#
####..
"""


def neighbours(board, x, y):
    total = 0
    for dx in range(x - 1, x + 2):
        for dy in range(y - 1, y + 2):
            if (x == dx and y == dy) or dx < 0 or dy < 0:
                continue
            try:
                if board[dy][dx]:
                    total += 1
            except IndexError:
                pass

    return total


def iterate(board):
    newBoard = []
    for _ in board:
        newBoard.append([])

    for y, line in enumerate(board):
        for x, c in enumerate(line):
            n = neighbours(board, x, y)
            newBoard[y].append(n in [2, 3] if c else n == 3)

    return newBoard


def print_board(board):
    print(*["".join("#" if c else "." for c in line) for line in board], sep="\n")
    print()


def part1(board, times):
    for i in range(times):
        board = iterate(board)

    return sum(sum(l) for l in board)


def part2(board, times):
    board[0][0] = True
    board[-1][0] = True
    board[0][-1] = True
    board[-1][-1] = True

    for i in range(times):
        board = iterate(board)
        board[0][0] = True
        board[-1][0] = True
        board[0][-1] = True
        board[-1][-1] = True
        # print_board(board)

    return sum(sum(l) for l in board)


def main():
    with open("day18.txt") as fin:
        board = [[c == "#" for c in line.strip()] for line in fin if line]
    # board = [[c == "#" for c in line] for line in test_input.split("\n") if line]

    print(part1(board, 100))
    print(part2(board, 100))


if __name__ == "__main__":
    main()

