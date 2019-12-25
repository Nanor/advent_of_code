import { Input } from "./input";
import intcode, { Intcode, withInput } from "./Intcode";

const read = (output: number[]) => {
  let out = "";
  output.forEach(c => {
    out += String.fromCharCode(c);
  });
  return out;
};

const print = (output: number[]) => console.log(read(output));

const ascii = (comp: Intcode, input = "", output = false): Intcode => {
  comp = withInput(
    JSON.parse(JSON.stringify(comp)),
    `${input}\n`.split("").map(c => c.charCodeAt(0))
  );

  if (output) {
    print(comp.output);
  }

  return comp;
};

type room = {
  path: string[];
  name: string;
  items: string[];
};

const explore = (comp, path = "", paths = [], rooms = []): room[] => {
  const dirs = ["north", "south", "east", "west"];

  if (path.match(/(east,west)|(west,east)|(north,south)|(south,north)$/))
    return rooms;

  const text = read(comp.output);

  const name = text.match(/== (.*) ==/)[1];

  const room = {
    name,
    path: path.split(",").slice(1),
    items: []
  };

  if (text.match(/Items here:/)) {
    const { index } = text.match(/Items here:/);

    room.items.push(text.slice(index).match(/- (.*)/)[1]);
  }

  const rs = [room, ...rooms];

  if (text.match("Security Checkpoint")) return rs;

  dirs.forEach(d => {
    const p = `${path},${d}`;

    if (text.match(d) && !paths.includes(p)) {
      rs.push(...explore(ascii(comp, d), p, [...paths, p]));
    }
  });

  return rs;
};

const reverse = (path: string[]) =>
  path.reverse().map(
    d =>
      ({
        north: "south",
        south: "north",
        east: "west",
        west: "east"
      }[d])
  );

const juggle = (comp: Intcode, items: string[]) => {
  const text = read(comp.output);
  if (text.match(/lighter/)) return;

  if (text.match(/heavier/)) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const newComp = ascii(comp, [`take ${item}`, "south"].join("\n"), false);
      const res = juggle(
        newComp,
        items.filter(i2 => item !== i2)
      );
      if (res) return res;
    }
  } else {
    return text;
  }
};

export const part1 = (input: Input) => {
  const data = input.asNumberArray();
  let comp = intcode(data);

  const rooms = explore(comp);

  // console.log(rooms.reduce((acc, room) => [...acc, ...room.items], []));
  const items = [
    // "escape pod",
    "coin",
    // "molten lava",
    "food ration",
    "sand",
    // "infinite loop",
    "astrolabe",
    "cake",
    "weather machine",
    "ornament",
    "jam"
    // "photons",
    // "giant electromagnet"
  ];

  rooms
    .filter(r => items.includes(r.items[0]))
    .forEach(room => {
      comp = ascii(
        comp,
        [...room.path, `take ${room.items[0]}`, ...reverse(room.path)].join(
          "\n"
        ),
        false
      );
    });

  const security = rooms.find(r => r.name === "Security Checkpoint");
  comp = ascii(comp, security.path.join("\n"), false);

  items.forEach(i => {
    comp = ascii(comp, `drop ${i}`, false);
  });
  comp = ascii(comp, "south", false);

  const text = juggle(comp, items);

  return text.match(/\d+/)[0];
};
