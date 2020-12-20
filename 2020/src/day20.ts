import { Input } from "./input";
// import * as fs from "fs";

type Tile = {
  id: string;
  grid: string[][];
  edges: string[][];
  edgeIds: number[];
  near?: string[];
};

const edgeToNumber = (edge: string[]): number => {
  const binary = edge.join("").replace(/\./g, "0").replace(/#/g, "1");
  const n1 = parseInt(binary, 2);

  let reversed = "";
  for (let n = binary.length - 1; n >= 0; n--) {
    reversed += binary[n];
  }

  const n2 = parseInt(reversed, 2);

  return Math.min(n1, n2);
};

const getEdges = (tile: string[][]): string[][] => {
  const size = tile[0].length;

  const edge1 = tile[0];
  let edge2 = "";
  let edge3 = "";
  let edge4 = "";

  for (let y = 0; y < size; y++) {
    edge2 += tile[y][size - 1];
  }

  for (let x = 0; x < size; x++) {
    edge3 += tile[size - 1][size - 1 - x];
  }

  for (let y = 0; y < size; y++) {
    edge4 += tile[size - 1 - y][0];
  }

  return [edge1, edge2.split(""), edge3.split(""), edge4.split("")];
};

const parseTile = (grid: string[][]) => {
  const edges = getEdges(grid);
  const edgeIds = edges.map(edgeToNumber);

  return { grid, edges, edgeIds };
};

const parseTiles = (input: Input): Tile[] => {
  const tiles: Tile[] = input.asParagraphs().map((tile) => {
    const [id] = tile[0].match(/\d+/);
    const grid = tile
      .slice(1)
      .filter((x) => x)
      .map((l) => l.split(""));

    return { id, ...parseTile(grid) };
  });

  tiles.forEach((tile) => {
    tile.near = tile.edgeIds.map((eId) => {
      const t3 = tiles.find((t2) => {
        if (tile.id === t2.id) return false;

        return t2.edgeIds.includes(eId);
      });

      return t3?.id;
    });
  });

  return tiles;
};

const rotateGrid = (grid: string[][]): string[][] => {
  const size = grid.length;

  const newGrid = [...Array(size)].map(() => [...Array(size)]);
  grid.forEach((l: string[], y: number) =>
    l.forEach((c, x) => {
      newGrid[x][size - 1 - y] = c;
    })
  );

  return newGrid;
};

export const part1 = (input: Input) => {
  const tiles = parseTiles(input);

  const corners = tiles.filter(
    ({ near }) => near.filter((x) => x !== undefined).length === 2
  );

  return corners.map(({ id }) => parseInt(id)).reduce((x, y) => x * y, 1);
};

export const part2 = (input: Input) => {
  const tiles = parseTiles(input);

  const grid = [...Array(12)].map(() => [...Array(12)]);
  const firstCorner = tiles.find(
    (t) => t.near.filter((x) => x !== undefined).length === 2
  );

  grid[0][0] = firstCorner;
  let toPlace = firstCorner.near.filter((x) => x !== undefined);
  let placed = [firstCorner.id];

  while (toPlace.length > 0) {
    const nextId = toPlace.shift();
    const next = tiles.find(({ id }) => id === nextId);

    let currPlaced = false;
    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 12; x++) {
        if (!currPlaced) {
          if (grid[y][x] === undefined) {
            const xEdge = x === 0 || x === 11;
            const yEdge = y === 0 || y === 11;
            const corner = xEdge && yEdge;
            const edge = xEdge || yEdge;

            if (
              (corner && next.near.filter((x) => x).length === 2) ||
              (edge && !corner && next.near.filter((x) => x).length === 3) ||
              (!edge && next.near.filter((x) => x).length === 4)
            ) {
              const nearBy = [
                grid[y - 1] && grid[y - 1][x],
                grid[y + 1] && grid[y + 1][x],
                grid[y] && grid[y][x - 1],
                grid[y] && grid[y][x + 1],
              ]
                .filter((x) => x)
                .map(({ id }) => id);

              if (
                nearBy.length >= 1 &&
                nearBy.every((n) => next.near.includes(n))
              ) {
                grid[y][x] = next;
                currPlaced = true;
                placed.push(nextId);

                next.near.forEach((n) => {
                  if (
                    n !== undefined &&
                    !toPlace.includes(n) &&
                    !placed.includes(n)
                  ) {
                    toPlace.push(n);
                  }
                });
              }
            }
          }
        }
      }
    }
  }

  let image = [...Array(96)].map(() => [...Array(96)]);

  grid.forEach((line, y) =>
    line.forEach((tile, x) => {
      const rootY = y * 8;
      const rootX = x * 8;

      const checkRotate = (tile: Tile, y: number, x: number): boolean => {
        return (
          tile.near[0] === (grid[y - 1] && grid[y - 1][x]?.id) &&
          tile.near[1] === grid[y][x + 1]?.id
        );
      };

      let rotate = 0;

      while (!checkRotate(tile, y, x)) {
        tile.near.unshift(tile.near.pop());

        tile.grid = rotateGrid(tile.grid);

        rotate += 1;
        if (rotate === 4) {
          rotate = 0;

          tile.grid = tile.grid.reverse();

          const a = tile.near[2];
          tile.near[2] = tile.near[0];
          tile.near[0] = a;
        }
      }

      tile.grid.slice(1, 9).forEach((l, y) =>
        l.slice(1, 9).forEach((c, x) => {
          image[rootY + y][rootX + x] = c;
        })
      );
    })
  );

  let rotate = 0;
  while (!findSnakes(image, true)) {
    image = rotateGrid(image);
    rotate += 1;

    if (rotate === 4) {
      rotate = 0;
      image = image.reverse();
    }
  }

  const raster = image
    .map((l) => l.map((x) => (x === undefined ? " " : x)).join(""))
    .join("\n");

  // if (!fs.existsSync("out")) fs.mkdirSync("out");
  // fs.writeFileSync("out/day20.txt", raster);

  return image
    .map((l) => l.filter((x) => x === "#").length)
    .reduce((x, y) => x + y, 0);
};

const snake = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   ",
].map((x) => x.split(""));

const findSnakes = (grid: string[][], draw = false): number => {
  let total = 0;
  for (let rootY = 0; rootY < grid.length - snake.length + 1; rootY++) {
    for (let rootX = 0; rootX < grid[0].length - snake[0].length + 1; rootX++) {
      let matches = true;

      for (let y = 0; y < snake.length; y++) {
        for (let x = 0; x < snake[0].length; x++) {
          if (
            snake[y][x].match(/[#@]/) &&
            !grid[rootY + y][rootX + x].match(/[#@]/)
          ) {
            matches = false;
          }
        }
      }

      if (matches) {
        if (draw) {
          for (let y = 0; y < snake.length; y++) {
            for (let x = 0; x < snake[0].length; x++) {
              if (snake[y][x].match(/[#@]/)) {
                grid[rootY + y][rootX + x] = "@";
              }
            }
          }
        }

        total += 1;
      }
    }
  }

  return total;
};
