from dataclasses import dataclass
from aoc.puzzle import Puzzle


class Day9(Puzzle):
    day = 9

    def part1(self) -> int:
        files: list[int | None] = []

        id = 0
        for i, c in enumerate(self.data):
            if i % 2 == 0:
                files += [id] * int(c)
                id += 1
            else:
                files += [None] * int(c)

        no_gaps = [f for f in files if f is not None]
        size = len(no_gaps)
        reverse_files = reversed(no_gaps)

        checksum: int = 0

        for i in range(size):
            f = files[i]
            if f is not None:
                checksum += f * i
            else:
                checksum += next(reverse_files) * i

        return checksum

    def part2(self) -> int:
        @dataclass
        class Block:
            size: int
            id: int | None

        blocks: list[Block] = []

        id = 0
        for i, c in enumerate(self.data):
            if i % 2 == 0:
                block = Block(int(c), id)
                blocks.append(block)
                id += 1
            else:
                blocks.append(Block(int(c), None))

        for i, block in reversed(list(enumerate(blocks))):
            if block.id is None:
                continue

            index = blocks.index(block, i)

            try:
                gap_index, gap = next(
                    (i, b)
                    for i, b in enumerate(blocks[:index])
                    if b.id is None and b.size >= block.size
                )
            except StopIteration:
                continue

            blocks[index] = Block(block.size, None)

            to_add = (
                [block, Block(gap.size - block.size, None)]
                if gap.size - block.size > 0
                else [block]
            )

            blocks = blocks[:gap_index] + to_add + blocks[gap_index + 1 :]

        checksum = 0
        pos = 0
        for block in blocks:
            if block.id is not None:
                checksum += block.id * (pos * 2 + block.size - 1) * block.size // 2
            pos += block.size
        return checksum
