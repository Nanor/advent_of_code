import { Input } from "./input";
import intcode, { withInput } from "./Intcode";

enum Dir {
  N = 1,
  S = 2,
  W = 3,
  E = 4
}
enum Status {
  Bump = 0,
  Move = 1,
  Found = 2
}
type Point = { x: number; y: number };

type World = { walls: Set<Point>; air: Set<Point> };

class Set<T> {
  data: {};
  constructor(xs: T[] = []) {
    this.data = {};
    xs.forEach(x => this.add(x));
  }

  add(x: T) {
    this.data[JSON.stringify(x)] = x;
  }

  values(): T[] {
    return Object.values(this.data);
  }

  has(x: T) {
    return Object.keys(this.data).includes(JSON.stringify(x));
  }

  delete(x: T) {
    delete this.data[JSON.stringify(x)];
  }
}

const newPos = (pos: Point, dir: Dir): Point => {
  switch (dir) {
    case Dir.N:
      return { x: pos.x, y: pos.y - 1 };
    case Dir.S:
      return { x: pos.x, y: pos.y + 1 };
    case Dir.W:
      return { x: pos.x - 1, y: pos.y };
    case Dir.E:
      return { x: pos.x + 1, y: pos.y };
  }
};

const draw = ({ walls, air }: World, pos: Point) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  [...Array.from(walls.values()), ...Array.from(air.values())].forEach(
    ({ x, y }) => {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }
  );

  let out = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (x === pos.x && y === pos.y) {
        out += "@";
      } else if (x === 0 && y === 0) {
        out += "S";
      } else if (walls.has({ x, y })) {
        out += "#";
      } else if (air.has({ x, y })) {
        out += " ";
      } else {
        out += "?";
      }
    }
    out += "\n";
  }

  console.log(out);
};

const cardinals = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
];

const search = (
  unknown: Set<Point>,
  { walls, air }: World,
  pos: Point,
  nearest
) => {
  cardinals.forEach(({ x: dx, y: dy }) => {
    const p = { x: pos.x + dx, y: pos.y + dy };
    if (!(walls.has(p) || air.has(p) || unknown.has(p))) {
      unknown.add(p);
      nearest[JSON.stringify(p)] = pos;
    }
  });
};

export const part1 = (input: Input) => {
  const data = input.asNumberArray();
  let comp = intcode(data);

  const world: World = {
    walls: new Set(),
    air: new Set()
  };

  let pos: Point = { x: 0, y: 0 };
  world.air.add(pos);

  const unknown = new Set(cardinals);

  const states = {
    [JSON.stringify(pos)]: JSON.stringify(comp)
  };
  const nearest = {};
  unknown.values().forEach(u => {
    nearest[JSON.stringify(u)] = pos;
  });
  const steps = {
    [JSON.stringify(pos)]: 0
  };

  while (true) {
    const target = unknown.values()[0];

    pos = nearest[JSON.stringify(target)];
    comp = JSON.parse(states[JSON.stringify(pos)]);

    let newDir: Dir;
    if (pos.x < target.x) {
      newDir = Dir.E;
    } else if (pos.x > target.x) {
      newDir = Dir.W;
    } else if (pos.y < target.y) {
      newDir = Dir.S;
    } else if (pos.y > target.y) {
      newDir = Dir.N;
    }

    comp = withInput(comp, [newDir]);
    const status: Status = comp.output[0];
    const nextPos = newPos(pos, newDir);

    unknown.delete(nextPos);

    switch (status) {
      case Status.Bump:
        world.walls.add(nextPos);
        break;
      case Status.Move:
        steps[JSON.stringify(nextPos)] = steps[JSON.stringify(pos)] + 1;
        world.air.add(nextPos);
        states[JSON.stringify(nextPos)] = JSON.stringify(comp);

        search(unknown, world, nextPos, nearest);

        pos = nextPos;
        break;
      case Status.Found:
        return steps[JSON.stringify(pos)] + 1;
    }
    // draw(world, pos);
  }
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();
  let comp = intcode(data);

  const world: World = {
    walls: new Set(),
    air: new Set()
  };

  let pos: Point = { x: 0, y: 0 };
  world.air.add(pos);

  const unknown = new Set(cardinals);

  const states = {
    [JSON.stringify(pos)]: JSON.stringify(comp)
  };
  const nearest = {};
  unknown.values().forEach(u => {
    nearest[JSON.stringify(u)] = pos;
  });
  const steps = {
    [JSON.stringify(pos)]: 0
  };

  let oxygen: Set<Point> = new Set();

  while (unknown.values().length > 0) {
    const target = unknown.values()[0];

    pos = nearest[JSON.stringify(target)];
    comp = JSON.parse(states[JSON.stringify(pos)]);

    let newDir: Dir;
    if (pos.x < target.x) {
      newDir = Dir.E;
    } else if (pos.x > target.x) {
      newDir = Dir.W;
    } else if (pos.y < target.y) {
      newDir = Dir.S;
    } else if (pos.y > target.y) {
      newDir = Dir.N;
    }

    comp = withInput(comp, [newDir]);
    const status: Status = comp.output[0];
    const nextPos = newPos(pos, newDir);

    unknown.delete(nextPos);

    switch (status) {
      case Status.Bump:
        world.walls.add(nextPos);
        break;
      case Status.Found:
        oxygen.add(nextPos);
      case Status.Move:
        steps[JSON.stringify(nextPos)] = steps[JSON.stringify(pos)] + 1;
        world.air.add(nextPos);
        states[JSON.stringify(nextPos)] = JSON.stringify(comp);

        search(unknown, world, nextPos, nearest);

        pos = nextPos;
        break;
    }
  }

  const vacuum = world.air;
  vacuum.delete(oxygen.values()[0]);

  let count = 0;
  while (vacuum.values().length > 0) {
    const toAdd = [];

    vacuum.values().forEach(({ x, y }) => {
      if (
        cardinals.some(({ x: dx, y: dy }) =>
          oxygen.has({ x: x + dx, y: y + dy })
        )
      ) {
        toAdd.push({ x, y });
      }
    });

    toAdd.forEach(p => {
      vacuum.delete(p);
      oxygen.add(p);
    });

    count += 1;
  }

  return count;
};
