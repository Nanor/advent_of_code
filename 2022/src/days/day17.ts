import { Input } from "../input";

type Pos = { x: number; y: number };

const rocks = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
  .split("\n\n")
  .map((rockString) => {
    const rockGrid = rockString
      .split("\n")
      .map((l) => l.split("").map((c) => c === "#"));

    const output: Pos[] = [];

    rockGrid.forEach((line, y) =>
      line.forEach((c, x) => {
        if (c) {
          output.push({ x, y });
        }
      })
    );

    return output;
  });

const width = 7;

const checkOverlap = (
  chamber: Set<number>,
  rock: typeof rocks[number],
  { x, y }: Pos
): Boolean =>
  rock.some(({ x: rx, y: ry }) => {
    const wx = x + rx;
    const wy = y - ry;

    return wx < 0 || wx >= width || wy < 0 || chamber.has(wx + wy * width);
  });

const solve = (input: Input, rockCount: number) => {
  const loopPoints: { [index: string]: { i: number; maxHeight: number } } = {};

  const jetOrder = input
    .asString()
    .split("")
    .filter((c): c is "<" | ">" => c === "<" || c === ">");
  let jetIndex = 0;
  let rockIndex = 0;

  let maxHeight = 0;

  let chamber = new Set<number>();

  for (let i = 0; i < rockCount; i++) {
    if (i > 1000) {
      const index = `${rockIndex},${jetIndex}`;

      if (loopPoints[index]) {
        const loopLength = i - loopPoints[index].i;
        const heightDifference = maxHeight - loopPoints[index].maxHeight;

        if ((rockCount - i) % loopLength === 0) {
          const loops = (rockCount - i) / loopLength;

          return maxHeight + heightDifference * loops;
        }
      }

      loopPoints[index] = { i, maxHeight };
    }

    const rock = rocks[rockIndex];
    let rockPos = {
      x: 2,
      y: maxHeight + 3 + Math.max(...rock.map(({ y }) => y)),
    };

    while (true) {
      let newPos = {
        x: rockPos.x + (jetOrder[jetIndex] === "<" ? -1 : 1),
        y: rockPos.y,
      };
      jetIndex = (jetIndex + 1) % jetOrder.length;

      if (!checkOverlap(chamber, rock, newPos)) {
        rockPos = newPos;
      }

      newPos = { x: rockPos.x, y: rockPos.y - 1 };

      if (!checkOverlap(chamber, rock, newPos)) {
        rockPos = newPos;
      } else {
        rock.forEach(({ x: rx, y: ry }) => {
          const x = rockPos.x + rx;
          const y = rockPos.y - ry;

          chamber.add(x + y * width);
          maxHeight = Math.max(maxHeight, y + 1);
        });

        break;
      }
    }

    rockIndex = (rockIndex + 1) % rocks.length;
  }

  return maxHeight;
};

export const part1 = (input: Input) => solve(input, 2022);
export const part2 = (input: Input) => solve(input, 1000000000000);
