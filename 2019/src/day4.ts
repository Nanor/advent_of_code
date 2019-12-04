const range = [136760, 595730];

const digitAt = (i: number, n: number) => {
  if (n < 0 || n > 5) return undefined;

  const exp = Math.pow(10, 5 - n);

  return Math.floor((i / exp) % 10);
};

const doubles = (i: number) => {
  for (let n = 0; n < 5; n++) {
    if (digitAt(i, n) === digitAt(i, n + 1)) {
      return true;
    }
  }
  return false;
};

const doubles2 = (i: number) => {
  for (let n = 0; n < 5; n++) {
    const curr = digitAt(i, n);
    if (curr === digitAt(i, n + 1)) {
      if (curr === digitAt(i, n + 2)) {
        while (digitAt(i, n + 1) === curr) n += 1;
      } else {
        return true;
      }
    }
  }
  return false;
};

const increasing = (i: number) => {
  for (let n = 0; n < 5; n++) {
    if (digitAt(i, n) > digitAt(i, n + 1)) {
      return false;
    }
  }
  return true;
};

const isValid = (i: number) => doubles(i) && increasing(i);
const isValid2 = (i: number) => doubles2(i) && increasing(i);

export const part1 = () => {
  let total = 0;

  for (let i = range[0]; i <= range[1]; i++) {
    if (isValid(i)) {
      total += 1;
    }
  }

  return total;
};

export const part2 = () => {
  let total = 0;

  for (let i = range[0]; i <= range[1]; i++) {
    if (isValid2(i)) {
      total += 1;
    }
  }

  return total;
};
