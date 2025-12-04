#!/usr/local/bin/python3


def count(grid):
    return sum(l.count("#") for l in grid)


def permute(grid):
    output = []

    for g in [grid, grid[::-1]]:
        for _ in range(4):
            g = list(zip(*g[::-1]))
            output.append([list(l) for l in g])

    return output


def apply(rules, grid, times=1):
    for n in range(times):
        size = len(grid)
        if size % 2 == 0:
            chunk_size = 2
            new_size = (size // 2) * 3
        else:
            chunk_size = 3
            new_size = (size // 3) * 4

        new_grid = [[""] * new_size for _ in range(new_size)]

        for x, x1 in zip(range(0, size, chunk_size), range(0, new_size, chunk_size + 1)):
            for y, y1 in zip(range(0, size, chunk_size), range(0, new_size, chunk_size + 1)):
                chunk = [row[x : x + chunk_size] for row in grid[y : y + chunk_size]]
                chunk_string = "".join("".join(l) for l in chunk)

                new_chunk = rules[chunk_string]

                for x2, row in enumerate(new_chunk):
                    for y2, col in enumerate(row):
                        new_grid[y1 + y2][x1 + x2] = col

        grid = [list(r) for r in new_grid]

    return grid


def main():
    rules = {}
    with open("../files/2017_21_input.txt") as f:
        for line in f:
            grid1, grid2 = line.strip().split(" => ")
            grid_out = [list(l) for l in grid2.split("/")]

            for g in permute([list(l) for l in grid1.split("/")]):
                rules["".join("".join(r) for r in g)] = grid_out

    start = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]]

    grid = apply(rules, start, times=5)
    print(count(grid))

    grid = apply(rules, start, times=18)
    print(count(grid))


if __name__ == "__main__":
    main()
