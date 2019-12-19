import { Input } from "./input";
import intcode from "./Intcode";

export const part1 = (input: Input) => {
  const data = input.asNumberArray();

  let count = 0;
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      const comp = intcode(data, [x, y]);

      const pulled = comp.output[0];
      if (pulled) count += 1;
    }
  }

  return count;
};

export const part2 = (input: Input) => {
  const data = input.asNumberArray();

  const hash = {};
  const isPulled = (x, y) => {
    const hashKey = x * 10000 + y;
    if (hashKey in hash) return hash[hashKey];

    const comp = intcode(data, [x, y]);
    const pulled = comp.output[0];
    hash[hashKey] = pulled;
    return pulled;
  };

  const findDiagonal = () => {
    let minD = 0;
    let maxD = 10000;

    while (minD + 1 < maxD) {
      const d = Math.ceil((minD + maxD) / 2);

      let count = 0;
      for (let y = 0; y < d; y++) {
        const x = d - y;
        if (isPulled(x, y)) count += 1;
      }

      if (count >= 100) maxD = d;
      if (count < 100) minD = d;
    }

    return minD;
  };

  const d = findDiagonal();

  let minX = Infinity;
  let minY = Infinity;

  for (let y = 0; y < d; y++) {
    const x = d - y;
    if (isPulled(x, y)) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
    }
  }

  for (let x = minX; x < minX + 100; x++) {
    for (let y = minY; y < minY + 100; y++) {
      if (!isPulled(x, y)) throw Error("Ooops");
    }
  }

  return minX * 10000 + minY;
};
