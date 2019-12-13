import { Input } from "./input";

export const part1 = (input: Input) => {
  const data = input.asLines().map(l => l.split(")"));

  const checked = [];
  const unchecked = ["COM"];
  const orbitCount = { COM: 0 };

  while (unchecked.length > 0) {
    const obj = unchecked.pop();

    const subObjs = data
      .filter(([obj1, obj2]) => obj1 === obj)
      .map(([obj1, obj2]) => obj2);

    subObjs.forEach(obj2 => {
      orbitCount[obj2] = orbitCount[obj] + 1;
    });

    checked.push(obj);
    unchecked.push(...subObjs);
  }

  return Object.values(orbitCount).reduce((acc, x) => acc + x);
};

const getPath = (data, start) => {
  const path = [];

  let curr = start;
  while (true) {
    curr = data.find(([obj1, obj2]) => obj2 === curr)[0];
    path.push(curr);

    if (curr === "COM") {
      return path;
    }
  }
};

export const part2 = (input: Input) => {
  const data = input.asLines().map(l => l.split(")"));

  const youPath = getPath(data, "YOU");
  const sanPath = getPath(data, "SAN");

  const common = youPath.find(obj => sanPath.includes(obj));

  return youPath.indexOf(common) + sanPath.indexOf(common);
};
