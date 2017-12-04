def get_dir(x, y):
    if -y <= -x <= y:
        return '>'
    if -x >= -y >= x:
        return 'v'
    if -x < y <= x:
        return '^'
    if -y >= x >= y:
        return '<'
    return ' '

def part1(input):
    x = 0
    y = 0

    for _ in range(input-1):
        dir = get_dir(x, y)
        if dir == '<':
            x -= 1
        if dir == '>':
            x += 1
        if dir == 'v':
            y += 1
        if dir == '^':
            y -= 1
        
    return abs(x) + abs(y)

class Board:
    def __init__(self):
        self.board = {}

    def get(self, x, y):
        if (x, y) in self.board:
            return self.board[(x, y)]
        else:
            return 0

    def set(self, x, y, val):
        self.board[(x, y)] = val

def part2(input):
    x = 1
    y = 0
    board = Board()
    board.set(0, 0, 1)

    while True:
        total = sum(board.get(x+dx, y+dy) for (dx, dy) in [(1, 0), (1, -1),(0, -1),(-1, -1),(-1, 0),(-1, 1),(0, 1),(1, 1)])
        board.set(x, y, total)
        dir = get_dir(x, y)
        if dir == '<':
            x -= 1
        if dir == '>':
            x += 1
        if dir == 'v':
            y += 1
        if dir == '^':
            y -= 1
        if total > input:
            return total

def main():
    input = 347991
    # for y in range(-10, 10):
    #     for x in range(-10, 10):
    #         print(get_dir(x,y), end='')
    #     print('')
    # for x in range(1, 10):
    #     print(x, part1(x))
    print(part1(input))
    print(part2(input))

if __name__ == '__main__':
    main()