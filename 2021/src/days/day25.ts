import { Input } from "../input";

enum Tile {
  East = ">",
  South = "v",
  Empty = ".",
}

export const part1 = (input: Input) => {
  let map = input.asGrid() as Tile[][];
  let lastMap: Tile[][];

  const copy = () => (lastMap = map.map((l) => [...l]));
  const get = (x: number, y: number) =>
    lastMap[y % map.length][x % map[0].length];
  const set = (x: number, y: number, v: Tile) =>
    (map[y % map.length][x % map[0].length] = v);

  let time = 0;
  let moved = true;
  while (moved) {
    moved = false;
    time += 1;

    copy();

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (get(x, y) === Tile.East && get(x + 1, y) === Tile.Empty) {
          set(x, y, Tile.Empty);
          set(x + 1, y, Tile.East);
          moved = true;
          x += 1;
        }
      }
    }

    copy();

    for (let x = 0; x < map[0].length; x++) {
      for (let y = 0; y < map.length; y++) {
        if (get(x, y) === Tile.South && get(x, y + 1) === Tile.Empty) {
          set(x, y, Tile.Empty);
          set(x, y + 1, Tile.South);
          moved = true;
          y += 1;
        }
      }
    }
  }

  return time;
};
